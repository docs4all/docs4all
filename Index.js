#!/usr/bin/env node
const Server = require("./Server.js");
const Publisher = require("./Publisher.js");
const Builder = require("./Builder.js");
const { Command } = require('commander');
const program = new Command();

var options;

if(process.env.mode=="start"){
  options = {
    mode:"start"
  }
}else{

  program
  .name('docs4all')
  .description('wiki with infinite menu')
  .version('1.0.1');

  program
  .requiredOption('-m, --mode <string>', 'start,publish,build')
  .option('-l, --logo <string>', 'a jpg or png, local file')
  program.parse();
  options = program.opts();
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