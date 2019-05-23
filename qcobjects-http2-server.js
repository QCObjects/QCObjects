#!/usr/bin/env node

"use strict";
const path = require('path');
const absolutePath = path.resolve( __dirname, "./" );

require('qcobjects');
const Handlebars = require('handlebars');

const http2 = require('http2');
const fs = require('fs');
const mime = require("mime");

CONFIG.set('documentRootFileIndex','index.html');
CONFIG.set('documentRootFileIndex','index.html');
CONFIG.set('useConfigService',false); // this is only true useful for client web side
CONFIG.set('documentRoot','./');
CONFIG.set('serverPort',443);
CONFIG.set('private-key-pem','localhost-privkey.pem');
CONFIG.set('private-cert-pem','localhost-cert.pem');
CONFIG.set('allowHTTP1',true);

'use strict';
Package('org.quickcorp.qcobjects.main.http2.server',[
  Class('PipeLog',{
    pipe:(o)=>{
      var _o = [];
      for (var k in o){
        if (typeof o[k] !== 'undefined'
            && o[k] !== null
            && typeof o[k] !== 'function'){
          try {
            _o.push(''+k+'='+o[k].toString());
          } catch (e){
            // error logging, do nothing
          }
        }
      }
      return _o.join(' ');
    }
  }),
  Class('FileDispatcher',{
    name:CONFIG.get('documentRootFileIndex'),
    template:'',
    templateURI:CONFIG.get('documentRootFileIndex'),
    headers:{},
    body:'',
    filename:'',
    file_extension:function (){
      return this.filename.substr(this.filename.indexOf("."));
    },
    isTemplate:function (){
      return this.file_extension()=='.html' || this.file_extension() == '.tpl.html';
    },
    _done:function (){
      var appTemplateInstance = this;
      const source = appTemplateInstance.template;
      if (appTemplateInstance.isTemplate()){
        const template = Handlebars.compile(source);
        appTemplateInstance.body = template({title: 'QCObjects'});
      } else {
        appTemplateInstance.body = source;
      }

      if (['.png',
            '.jpg',
            '.jpeg',
            '.json',
            '.html',
            '.tpl.html',
            '.css',
            '.js',
            '.svg'].includes(appTemplateInstance.file_extension())){
        appTemplateInstance.headers['content-type']=mime.getType(appTemplateInstance.templateURI);
        appTemplateInstance.done.call(appTemplateInstance,
                                      appTemplateInstance.headers,
                                      appTemplateInstance.body,
                                      appTemplateInstance.templateURI,
                                      appTemplateInstance.isTemplate());
      } else {
        appTemplateInstance.done.call(appTemplateInstance,
                                      {
                                        ':status': 403,
                                        'content-type': 'text/plain'
                                      },
                                      'FORBIDDEN','notfound.html',false);
      }
    },
    done:function (headers,body){},
    _new_:function (o){
      var scriptname = o.scriptname;
      this.filename = scriptname;
      var pathname = (o.pathname !== '')?(o.pathname+'/'):('');
      var appTemplateInstance = this;
      appTemplateInstance.done = o.done;
      appTemplateInstance.templateURI = CONFIG.get('documentRoot')+pathname+scriptname;
      appTemplateInstance.templateURI = appTemplateInstance.templateURI.replace('//','/');

      if (appTemplateInstance.isTemplate()){
        fs.readFile(appTemplateInstance.templateURI, function(err, data) {
          logger.debug('reading data from '+appTemplateInstance.templateURI);
          if (typeof data !== 'undefined'){
            appTemplateInstance.template = data.toString();
            appTemplateInstance._done.call(appTemplateInstance);
          } else {
            appTemplateInstance.headers = {
              ':status': 404,
              'content-type': 'text/html'
            };
            appTemplateInstance.done.call(appTemplateInstance,
                                          appTemplateInstance.headers,
                                          'FILE NOT FOUND','notfound.html',false);

            logger.debug('file not found');
          }
        });
      } else {
        appTemplateInstance.headers[':status']=200;
        appTemplateInstance.headers['content-type']=mime.getType(appTemplateInstance.templateURI);
        appTemplateInstance.done.call(appTemplateInstance,
                                      appTemplateInstance.headers,
                                      '',appTemplateInstance.templateURI,false);
      }

      logger.info('FileDispatcher initialized');
    }
  }),
  Class('HTTP2ServerResponse',{
    headers:{
      ':status': 200,
      'content-type': 'text/html'
    },
    body:'',
    request:null,
    fileDispatcher:null,
    sendFile: function (stream, fileName) {
      // read and send file content in the stream

      const fd = fs.openSync(fileName, "r");
      const stat = fs.fstatSync(fd);
      const headers = {
        "content-length": stat.size,
        "last-modified": stat.mtime.toUTCString(),
        "content-type": mime.getType(fileName)
      };
      stream.respondWithFD(fd, headers);
      stream.on("close", () => {
        console.log("closing file", fileName);
        fs.closeSync(fd);
      });
      stream.end();
    },
    _generateResponse:function (){
      var response = this;
      response.fileDispatcher = New(FileDispatcher,{
        scriptname:response.request.scriptname,
        pathname:response.request.pathname,
        done:function (headers,body,templateURI,isTemplate){
          response.headers = headers;
          var stream = response.stream;
          if (isTemplate){
            response.body = body;
            stream.respond(response.headers);
            stream.write(response.body);
            stream.end();
          } else if (headers[':status']==200){
            response.sendFile(stream,templateURI);
          } else {
            stream.respond(response.headers);
            stream.end();
          }
        }
      });

    },
    _new_:function (o){
      var self = this;
      self.body = '';
      self.stream = o.stream;
      self._generateResponse();

    }
  }),
  Class('HTTP2ServerRequest',{
    scriptname:'',
    path:'',
    method:'',
    url:'',
    protocol: null,
    slashes: null,
    auth: null,
    host: null,
    port: null,
    hostname: null,
    hash: null,
    search: '',
    query: '',
    pathname: '',
    path: '',
    href: ''
  }),
  Class('HTTP2Server',{
    request:null,
    response:'',
    server:http2.createSecureServer({
      key: fs.readFileSync(CONFIG.get('private-key-pem')),
      cert: fs.readFileSync(CONFIG.get('private-cert-pem')),
      allowHTTP1:CONFIG.get('allowHTTP1')
    }),
    scriptname:'',
    start:function (){
      var server = this.server;

      // http2 port is 8443 but normally is used 443 by replacing current https
      server.listen(CONFIG.get('serverPort'));
    },
    _new_:function (){
      var server = this.server;

      server.on('error', (err) => console.error(err));

      server.on('session', (session) => {
        // Set altsvc for origin https://example.org:80
      //  session.altsvc('h2=":8000"', 'https://localhost:80');
        session.origin('https://localhost');
      });

      server.on('stream', (stream, headers, flags) => {
      //  stream.session.altsvc('h2=":8000"', stream.id);
        this.request = Object.assign(New(HTTP2ServerRequest),require('url').parse(headers[':path']));
        this.request.method = headers[':method'];
        this.request.path = headers[':path'];

        if (this.request.pathname.indexOf('.')<0){
            this.request.scriptname = CONFIG.get('documentRootFileIndex');
        } else {
          this.request.scriptname = this.request.pathname.split('/').reverse()[0];
        }
        this.request.pathname = this.request.pathname.substr(0,this.request.pathname.lastIndexOf('/'));

        logger.debug(PipeLog.pipe(this.request));

        // ...

        this.response = New(HTTP2ServerResponse,{
          stream:stream,
          request:this.request
        });
      });

    }
  })
]);


Class('Main',{
  _new_:()=>{
    const app = New(HTTP2Server);
    app.start();

    logger.debug('initialized');
  }
});

let __main__ = New(Main);
