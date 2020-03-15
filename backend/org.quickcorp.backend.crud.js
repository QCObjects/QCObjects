/**
 * QCObjects CLI 0.1.x
 * ________________
 *
 * Author: Jean Machuca <correojean@gmail.com>
 *
 * Cross Browser Javascript Framework for MVC Patterns
 * QuickCorp/QCObjects is licensed under the
 * GNU Lesser General Public License v3.0
 * [LICENSE] (https://github.com/QuickCorp/QCObjects/blob/master/LICENSE.txt)
 *
 * Permissions of this copyleft license are conditioned on making available
 * complete source code of licensed works and modifications under the same
 * license or the GNU GPLv3. Copyright and license notices must be preserved.
 * Contributors provide an express grant of patent rights. However, a larger
 * work using the licensed work through interfaces provided by the licensed
 * work may be distributed under different terms and without source code for
 * the larger work.
 *
 * Copyright (C) 2015 Jean Machuca,<correojean@gmail.com>
 *
 * Everyone is permitted to copy and distribute verbatim copies of this
 * license document, but changing it is not allowed.
*/
"use strict";
const fs = require('fs');
const os = require('os');
const { exec,execSync } = require('child_process');

Package('org.quickcorp.backend.crud',[
  Class('EntityCollection',Object,{
    crudEntity: null,
    list: function (){
      var crudEntity = this.crudEntity;
      if (!global.get(`collection_${crudEntity}`)){
        global.set(`collection_${crudEntity}`,New(ArrayCollection,{source:[]}));
      }
      return global.get(`collection_${crudEntity}`,New(ArrayCollection,{source:[]}));
    },
    getItem: function (index){
      var crudEntity = this.crudEntity;
      return this.list(crudEntity).source[index];
    },
    setItem: function (index,value){
      var crudEntity = this.crudEntity;
      this.list(crudEntity).source[index] = value;
    },
    addItem: function (item){
      var crudEntity = this.crudEntity;
      if (typeof item == 'object'){
        item.index = this.list(crudEntity).length;
      }
      this.list(crudEntity).source.push(item);
      return item;
    },
    deleteItem: function (index){
      var crudEntity = this.crudEntity;
      var list = this.list(crudEntity).source;
      delete list[index];
    }
  }),
  Class('CRUDMicroservice',BackendMicroservice,{
    body:null,
    tempFileName: '',
    options: function (data){
      var microservice = this;
      microservice.done();
    },
    get:function (data){
      var microservice = this;
      var entityCollection = New(EntityCollection,{
        crudEntity:microservice.route.entity
      });
      switch (microservice.route.action) {
        case 'new':
          microservice.body = {
            result:entityCollection.addItem(data)
          }
          microservice.done();

          break;
        case 'edit':
          microservice.body = {
            result:entityCollection.setItem(data.index,data.value)
          }
          microservice.done();
          break;
        case 'delete':
          microservice.body = {
            result:entityCollection.deleteItem(data.index)
          }
          microservice.done();

          break;
        case 'list':
          microservice.body = {
            result:[...entityCollection.list().source],
            length:entityCollection.list().length
          };
          microservice.done();
          break;
        case 'get':
          microservice.body = {
            result:entityCollection.getItem(data.index)
          };
          microservice.done();
          break;
        default:
          microservice.done();
          break;
      }

    },
    post:function (data){
      var microservice = this;
      var entityCollection = New(EntityCollection,{
        crudEntity:microservice.route.entity
      });
      switch (microservice.route.action) {
        case 'new':
          microservice.body = {
            result:entityCollection.addItem(data)
          }
          microservice.done();

          break;
        case 'edit':
          microservice.body = {
            result:entityCollection.setItem(data.index,data.value)
          }
          microservice.done();
          break;
        case 'delete':
          microservice.body = {
            result:entityCollection.deleteItem(data.index)
          }
          microservice.done();

          break;
        case 'list':
          microservice.body = {
            result:[...entityCollection.list().source],
            length:entityCollection.list().length
          };
          microservice.done();
          break;
        case 'get':
          microservice.body = {
            result:entityCollection.getItem(data.index)
          };
          microservice.done();
          break;
        default:
          microservice.done();
          break;
      }
    }
  }),
  Class('Microservice',CRUDMicroservice)
]);
