const express = require('express');
const path = require('path');
const fs = require('fs');
var MarkdownDataSource = require('./MarkdownDataSource.js');
var Common = require("./Common.js");

function Server() {
  var app = express();
  var projectBaseLocation = process.env.PWD;
  const allowed_login_types = ["simple", "microsoft"]
  var markdownFolder = process.env.DOCS4ALL_MARKDOWN_FOLDER ||"markdown";

  this.start = async (mode) => {
    console.log("Base location: "+projectBaseLocation);
    var isRunningFromWithinDocs4All = await Common.isRunningFromWithinDocs4All();
    var expectedMarkdownLocation = path.join(projectBaseLocation, markdownFolder);
    var databaseLocation;

    if(await Common.fileExist(expectedMarkdownLocation)){
      markdownLocation = expectedMarkdownLocation;
      console.log("markdown folder was found: "+markdownLocation);
      //since user has created their own markdown files, we need to scan the folder
      //and subfolder to create a flat data to be used in the left menu 
      databaseLocation = path.join(projectBaseLocation, "database.json")
      var markdownDataSource = new MarkdownDataSource(databaseLocation);
      await markdownDataSource.safeInit();
      markdownDataSource.setDocumentsBaseDir(markdownLocation);
      markdownDataSource.loadDocuments(markdownDataSource.getDocumentsBaseDir());
      markdownDataSource.save();
      //if everything is ok, databaseLocation should contain a json file
    }else{
    
      if(isRunningFromWithinDocs4All){
        //pre build database will be used
        databaseLocation = path.join(projectBaseLocation, "database.json");                        
      }else{
        databaseLocation = path.join(projectBaseLocation, "node_modules", "docs4all", "database.json");        
      }
      console.log("markdown folder was not found. Default database will be used: "+databaseLocation); 
    }

    var themeLocation;    

    if(isRunningFromWithinDocs4All){
      themeLocation = path.join(projectBaseLocation, "theme");
      console.log("default theme folder will be used: "+themeLocation);
    }else{
      var customThemeLocation = path.join(projectBaseLocation, "theme");
      if(await Common.fileExist(customThemeLocation)){
        themeLocation = customThemeLocation;
        console.log("custom theme folder was found: "+themeLocation);     
      }else{
        themeLocation = path.join(projectBaseLocation, "node_modules", "docs4all", "theme");
        console.log("default theme folder will be used: "+themeLocation);
      }  
    }

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

    var customImageLogoFile = path.join(projectBaseLocation, "bootstraper-logo.png");      
    if(await Common.fileExist(customImageLogoFile)){    
      console.log("custom image logo was found:"+customImageLogoFile);    
      app.get('/assets/img/bootstraper-logo.png', function(req, res) {
        res.sendFile(customImageLogoFile);
      });
    }else{
      console.log("custom image logo was not found");     
    }

    app.use("/", express.static(themeLocation));

    app.get('/', function(req, res) {
      res.sendFile(path.join(themeLocation, 'index.html'));
    });

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

    app.listen(port, function() {
      console.log('Docs4All app is running on ' + port);
    });
  }
}


module.exports = Server;
