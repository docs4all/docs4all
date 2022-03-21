var express = require('express');
var path = require('path');
const fs = require('fs');
var MarkdownDataSource = require('./MarkdownDataSource.js');

function Server() {
  var app = express();
  var projectBaseLocation = process.env.PWD;
  const allowed_login_types = ["simple", "microsoft"]

  this.start = async (mode) => {
    console.log("Base location: "+projectBaseLocation);
    var docsLocation = path.join(projectBaseLocation, "docs");
    var customDocs = false;
    try {
      await fs.promises.access(docsLocation, fs.constants.F_OK)
      console.log("docs folder was found: "+docsLocation);
      customDocs = true;
    } catch (e) {
      console.log("docs folder was not found. Default docs will be used");
      docsLocation = path.join(projectBaseLocation, "node_modules", "docs4all", "docs")
    }

    var databaseLocation;
    if(customDocs===true){
      databaseLocation = path.join(projectBaseLocation, "database.json")
    }else{
      databaseLocation = path.join(projectBaseLocation, "node_modules", "docs4all", "database.json")
    }

    var markdownDataSource = new MarkdownDataSource(databaseLocation);
    markdownDataSource.setDocumentsBaseDir(docsLocation);
    markdownDataSource.loadDocuments(markdownDataSource.getDocumentsBaseDir());
    markdownDataSource.save();

    var themeLocation = path.join(projectBaseLocation, "theme")
    try {
      await fs.promises.access(themeLocation, fs.constants.F_OK)
      console.log("custom theme folder was found: "+themeLocation);
    } catch (e) {
      console.log("theme folder was not found. Default theme will be used");
      themeLocation = path.join(projectBaseLocation, "node_modules", "docs4all", "theme")
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

    app.use("/", express.static(themeLocation));

    app.get('/', function(req, res) {
      res.sendFile(path.join(themeLocation, 'index.html'));
    });

    app.get('/database.json', function(req, res) {
      res.sendFile(databaseLocation);
    });

    app.get('/ui-settings.json', async function(req, res) {
      try {
        await fs.promises.access(path.join(projectBaseLocation, "ui-settings.json"), fs.constants.F_OK)
        res.sendFile(path.join(projectBaseLocation, "ui-settings.json"));
      } catch (e) {
        res.json({code:"404", message:"ui-settings.json not found"});
      }
    });

    app.listen(port, function() {
      console.log('Docs4All app is running on ' + port);
    });
  }
}


module.exports = Server;
