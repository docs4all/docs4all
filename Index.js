#!/usr/bin/env node
const Server = require("./Server.js");
var args = process.argv.slice(2);

if(typeof args[0] === 'undefined' || args[0] === 'start'){
  var server = new Server();
  server.start()
}else if(args[0] === 'publish'){

}else{
  console.log("Docs4All does not support this argument: "+args[0]);
}
