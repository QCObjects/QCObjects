'use strict';
const path = require('path');
const fs = require('fs');
const Handlebars = require('handlebars');

Package('org.quickcorp.cli.templates.app.spa_local',[
  Class('AppTemplate',{
    name:'app/index.html',
    template:'',
    templateURI:'spa-local.html',
    body:'',
    compileAndSave:false,
    save:function (){
      var appTemplateInstance = this;
      fs.mkdir('app/',()=>{
        fs.writeFile(appTemplateInstance.name, appTemplateInstance.body, err => {
            if (err) {
                return console.error(`Autsch! Failed to store template: ${err.message}.`);
            }
            logger.info('Saved template!');
        });
      });
    },
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
  })
]);
