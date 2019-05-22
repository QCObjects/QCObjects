#!/usr/bin/env node

"use strict";
require('qcobjects');
const http2 = require('http2');
const fs = require('fs');

'use strict';
Package('org.quickcorp.qcobjects.main.http2.server',[
  Class('FileDispatcher',{
    name:'index.html',
    template:'',
    templateURI:'index.html',
    body:'',
    compileAndSave:false,
    done:function (){
      var appTemplateInstance = this;
      const source = appTemplateInstance.template;
      const template = Handlebars.compile(source);
      this.body = template({title: 'QCObjects'});
      if (appTemplateInstance.compileAndSave){
        appTemplateInstance.save();
      }

    },
    _new_:function (){

      var appTemplateInstance = this;
      const absolutePath = path.resolve( __dirname, "./" );

      fs.readFile(absolutePath+'/'+appTemplateInstance.templateURI, function(err, data) {
        appTemplateInstance.template = data.toString();
        appTemplateInstance.done.call(appTemplateInstance);
      });

      logger.info('App Template Manager Initialized');
    }
  }),
  Class('HTTP2Server',{
    server:http2.createSecureServer({
      key: fs.readFileSync('localhost-privkey.pem'),
      cert: fs.readFileSync('localhost-cert.pem')
    }),
    start:function (){
      var server = this.server;

      // http2 port is 8443 but normally is used 443 by replacing current https
      server.listen(443);
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
        const method = headers[':method'];
        const path = headers[':path'];
        const url = require('url').parse(path);

        logger.info(method);
        logger.info(path);
        logger.info(url.pathname);
        // ...
        stream.respond({
          ':status': 200,
          'content-type': 'text/plain'
        });
        stream.write('hello ');
        stream.write(path);
        stream.end('world');
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
