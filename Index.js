#!/usr/bin/env node
const Server = require("./Server.js");
const Publisher = require("./Publisher.js");
const Builder = require("./Builder.js");
var args = process.argv.slice(2);

if(typeof args[0] === 'undefined' || args[0] === 'start'){
  var server = new Server();
  server.start()
}else if(args[0] === 'build'){
  var builder= new Builder();
  builder.start();
}else if(args[0] === 'publish'){
  var publisher= new Publisher();
  publisher.start();
}else{
  console.log("Docs4All does not support this argument: "+args[0]);
}
