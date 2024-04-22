const express = require('express');
const path = require('path');
const fs = require('fs');
const Builder = require("./Builder.js");
var Common = require("./Common.js");
const yaml = require('js-yaml');
const serveStatic = require('serve-static');

function Server() {
  var app = express();
  var projectBaseLocation = process.env.PWD;
  const allowed_login_types = ["simple", "microsoft"]
  var markdownFolder = process.env.DOCS4ALL_MARKDOWN_FOLDER ||"markdown";
  var settings;
  
  this.start = async (mode) => {
    
    if(await Common.fileExist(path.join(process.cwd(), "settings.yaml"))){
      var rawContent = await fs.promises.readFile(path.join(process.cwd(), "settings.yaml"), "utf8");
      settings = yaml.load(rawContent)
    }
    
    var builder = new Builder();
    var builderResponse = await builder.start();
    var databaseLocation = builderResponse.databaseLocation;
    var themeLocation = builderResponse.themeLocation;
    var parsedIndex;

    var staticAssets = new serveStatic(themeLocation)
    var customImageLogoFileExist = false;

    var port = process.env.PORT || 8080;

    if(process.env.LOGIN_TYPE && process.env.LOGIN_TYPE == "simple"){
      const DefaultLoginProvider = require('nodeboot-web-security-starter').DefaultLoginProvider;
      loginProvider = new DefaultLoginProvider({
        express: app,
        usersDataSource: {
          envKey : "USER_"
        },
        title: "Docs4ll",
        signinHtmlTheme : "material"
      });
      loginProvider.configure();
    }else if(process.env.LOGIN_TYPE && process.env.LOGIN_TYPE == "microsoft"){
      const MicrosoftLoginProvider = require('nodeboot-web-security-starter').MicrosoftLoginProvider;
      loginProvider = new MicrosoftLoginProvider({
        express: app,
        baseUrl: process.env.BASE_URL,
        usersDataSource: {
          envKey : "ALLOWED_USERS"
        },
        microsoft: {
          clientId: process.env.LOGIN_OAUTH2_CLIENT_ID,
          clientSecret: process.env.LOGIN_OAUTH2_CLIENT_SECRET
        }
      });
      loginProvider.configure();
    }else{
      console.log("Login type: "+process.env.LOGIN_TYPE);
      console.log("Login type is not supported. Allowed types: "+allowed_login_types);
      console.log("Login is disabled");
    }

    if(settings.logo && settings.logo.startsWith(".") && 
        await Common.fileExist(path.join(process.cwd(), settings.logo)) && Common.isImage(settings.logo)){
      console.log("custom image logo was found:"+path.join(process.cwd(), settings.logo));    
      customImageLogoFileExist = true;
      app.get('/assets/img/bootstraper-logo.png', function(req, res) {
        res.sendFile(path.join(process.cwd(), settings.logo));
      });
    }else{
      console.log("custom image logo was not found");     
    }

    app.get('/database.json', function(req, res) {
      res.sendFile(databaseLocation);
    });

    app.get('/settings.ini', async function(req, res) {
      try {
        await fs.promises.access(path.join(projectBaseLocation, "settings.ini"), fs.constants.F_OK)
        res.sendFile(path.join(projectBaseLocation, "settings.ini"));
      } catch (e) {
        res.json({code:"404", message:"settings.ini was not found"});
      }
    });  
    
    app.get('*', async function(req, res, next) {
  
      if(req.url !== "/" && !req.url.endsWith(".html")){
        return staticAssets(req, res, next);
      }
      
      if(parsedIndex){
        res.type('text/html');
        return res.send(parsedIndex)
      }

      var content = await fs.promises.readFile(path.join(themeLocation, 'index.html'), "utf8");
      content = content.replace(/{{site_name}}/g, settings.site_name || "Docs4all")
      
      if(settings.logo){
        if(Common.isValidHttpUrl(settings.logo)){
          content = content.replace("{{logo}}", `<img src="${settings.logo}" alt="bootraper logo" class="app-logo">`)
        }else if(customImageLogoFileExist===true){
          content = content.replace("{{logo}}", '<img src="assets/img/bootstraper-logo.png" alt="bootraper logo" class="app-logo">')
        } else{
          content = content.replace("{{logo}}", "&nbsp;&nbsp;"+settings.logo)
        }
      }else{
        content = content.replace("{{logo}}", '<img src="assets/img/bootstraper-logo.png" alt="bootraper logo" class="app-logo">')
      }

      if(settings.global_csr_variables){
        content = content.replace("{{global_csr_variables}}", JSON.stringify(settings.global_csr_variables))
      }else{
        content = content.replace("{{global_csr_variables}}", "{}")
      }

      parsedIndex = content;      
      res.type('text/html');
      res.send(content)
    });    

    app.listen(port, function() {
      console.log('Docs4All app is running on ' + port);
    });
  }
}


module.exports = Server;
