const express = require('express');
const path = require('path');
const fs = require('fs');
const Builder = require("./Builder.js");
var Common = require("./Common.js");

function Server() {
  var app = express();
  var projectBaseLocation = process.env.PWD;
  const allowed_login_types = ["simple", "microsoft"]
  var markdownFolder = process.env.DOCS4ALL_MARKDOWN_FOLDER ||"markdown";

  this.start = async (mode) => {
    
    var builder = new Builder();
    var builderResponse = await builder.start();
    var databaseLocation = builderResponse.databaseLocation;
    var themeLocation = builderResponse.themeLocation;

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
