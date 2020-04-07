#!/usr/bin/env node
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
require('qcobjects');

const welcometo = 'Welcome to \n';
const instructions = 'Type:\n .exit to quit\n .help for see a quick guide\n And any other command to execute like pure javascript \n All the QCObjects stuff is already loaded for you';
//const logo = ' .88888.    a88888b.  .88888.  dP       oo                     dP            \r\nd8\'   `8b  d8\'   `88 d8\'   `8b 88                              88            \r\n88     88  88        88     88 88d888b. dP .d8888b. .d8888b. d8888P .d8888b. \r\n88  db 88  88        88     88 88\'  `88 88 88ooood8 88\'  `\"\"   88   Y8ooooo. \r\nY8.  Y88P  Y8.   .88 Y8.   .8P 88.  .88 88 88.  ... 88.  ...   88         88 \r\n `8888PY8b  Y88888P\'  `8888P\'  88Y8888\' 88 `88888P\' `88888P\'   dP   `88888P\' \r\noooooooooooooooooooooooooooooooooooooooo88~oooooooooooooooooooooooooooooooooo\r\n                                        dP    ';
const logo = ' .d88888b.  .d8888b.  .d88888b. 888       d8b                888            \r\nd88P\" \"Y88bd88P  Y88bd88P\" \"Y88b888       Y8P                888            \r\n888     888888    888888     888888                          888            \r\n888     888888       888     88888888b.  8888 .d88b.  .d8888b888888.d8888b  \r\n888     888888       888     888888 \"88b \"888d8P  Y8bd88P\"   888   88K      \r\n888 Y8b 888888    888888     888888  888  88888888888888     888   \"Y8888b. \r\nY88b.Y8b88PY88b  d88PY88b. .d88P888 d88P  888Y8b.    Y88b.   Y88b.      X88 \r\n \"Y888888\"  \"Y8888P\"  \"Y88888P\" 88888P\"   888 \"Y8888  \"Y8888P \"Y888 88888P\' \r\n       Y8b                                888                               \r\n                                         d88P                               \r\n                                       888P\"   ';
const path = require('path');
const absolutePath = path.resolve( __dirname, "./" );

const package_config = require(absolutePath+'/package.json');
const qcobjects_pkg_config = require('qcobjects/package.json');
const qcobjects_sdk_pkg_config = require('qcobjects-sdk/package.json');
require(absolutePath+'/org.quickcorp.qcobjects.defaultsettings.js');
console.log(welcometo);
console.log(logo);
if (process.argv.length<3){
  console.log(instructions);
}

const vm = require('vm');
let sandbox = {
  require:require,
  module:module,
  __dirname:'./',
  __filename:'qcobjects-shell-file.js'
};
global.require = require.bind(global);
global.module = module;
global.__dirname = './';
global.__filename = 'qcobjects-shell-file.js';
global = vm.createContext(global);
const runScript = (code,logOutput=false)=>{
  const options = {filename:sandbox.__filename};

  const backgroundRunScript = (code)=>{
    var output = vm.runInContext(code,global,options);
    return output;
  }

  var output = backgroundRunScript(code);


  if (logOutput && typeof output !== 'undefined'){
    console.log(output);
  }
}

const syncGlobal = ()=>{
  var s = 'Object.assign(this,this.constructor.constructor(\'return this\')())';
  runScript(s);
}

const protected_symbols = [ 'clearInterval',
  'clearTimeout',
  'setInterval',
  'setTimeout',      'queueMicrotask',
   'clearImmediate',        'setImmediate',          '_asyncLoad',
   '_fireAsyncLoad',           'asyncLoad',              'logger',
           '_Crypt',              'CONFIG',           'waitUntil',
          '_super_', 'ComplexStorageCache',         'TagElements',
           'onload',        'InheritClass',           'Component',
       'Controller',                'View',             'Service',
      'JSONService',       'ConfigService',                  'VO',
    'serviceLoader',     'componentLoader',        'ComponentURI',
         'SourceJS',           'SourceCSS',           'ArrayList',
  'ArrayCollection',              'Effect',               'Timer',
           'Export',              'Import',             'Package',
            'Class',                 'New',                 'Tag',
            'Ready',             'Contact',           'FormField',
      'ButtonField',          'InputField',           'TextField',
       'EmailField',       'GridComponent',      'GridController',
         'GridView',                'Move',             'RotateX',
          'RotateY',             'RotateZ',              'Rotate',
             'Fade',              'Radius',          'CanvasTool',
      'BasicLayout'
]

const preloaded_scripts = [
  "require('qcobjects')",
  "Object.assign(this,this.constructor.constructor(\'return this\')())"
];

for (var k in preloaded_scripts){
  runScript(preloaded_scripts[k].trim());
}

var net = require("net"),
    repl = require("repl");

global.connections = 0;
let unixsocket_default = "/tmp/node-repl-sock";

repl.start("QCObjects Collaborative Repl> ").context = global;

let unixsocket_server = net.createServer(function (socket) {
  global.connections += 1;
  repl.start("QCObjects Collaborative Unix socket> ", socket).context=global;
}).listen(CONFIG.get("unix_socket",unixsocket_default));

let http_server = net.createServer(function (socket) {
  global.connections += 1;
  repl.start("QCObjects Collaborative TCP socket> ", socket).context=global;
}).listen(CONFIG.get('serverPortHTTP',80),CONFIG.get('domain','0.0.0.0'));

http_server.on('error', function (e) {
  if (e.code == 'EADDRINUSE') {
    console.log('Address in use, retrying...');
    setTimeout(function () {
      http_server.close();
      http_server.listen(CONFIG.get('serverPortHTTP',80),CONFIG.get('domain','0.0.0.0'));
    }, 1000);
  }
});

unixsocket_server.on('error', function (e) {
  if (e.code == 'EADDRINUSE') {
    console.log('Address in use, retrying...');
    setTimeout(function () {
      unixsocket_server.close();
      unixsocket_server.listen(CONFIG.get("unix_socket",unixsocket_default));
    }, 1000);
  }
});
