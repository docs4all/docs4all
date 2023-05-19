#!/usr/bin/env node
const Server = require("./Server.js");
const Publisher = require("./Publisher.js");
const Builder = require("./Builder.js");
const { commander } = require('commander');

var options;

if(process.env.mode=="server"){
  options = {
    mode:"start"
  }
}else{
  commander
  .requiredOption('-m, --mode <string>', 'start,publish,build')
  .option('-l, --logo <string>', 'a jpg or png, local file')
  commander.parse();
  options = commander.opts();
}

if(options.mode === 'start'){
  var server = new Server();
  server.start()
}else if(options.mode === 'build'){
  var builder= new Builder();
  builder.start();
}else if(options.mode === 'publish'){
  var publisher= new Publisher();
  publisher.start();
}else{
  console.log("Docs4All does not support this argument: "+options.mode);
}