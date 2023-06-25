var rimraf = require("rimraf");
var util = require("util");
var fs = require("fs");
var fsExtra = require("fs-extra");
var path = require("path");
const rimrafPromise = util.promisify(rimraf);
const mkdirPromise = util.promisify(fs.mkdir);
const copyPromise = util.promisify(fsExtra.copy);

function Publisher(){
  var projectBaseLocation = process.env.PWD;
  var markdownFolder = process.env.DOCS4ALL_MARKDOWN_FOLDER ||"markdown";
  var siteFolder = process.env.DOCS4ALL_SITE_FOLDER ||"site";

  this.start = async () => {
    console.log("Base location: "+projectBaseLocation);
    var docsLocation = path.join(projectBaseLocation, markdownFolder);
    var customDocs = false;
    try {
      await fs.promises.access(docsLocation, fs.constants.F_OK)
      customDocs = true;
    } catch (e) {
      console.log(e);
      customDocs = false;
    }
    if(customDocs===false){
      console.log("markdown folder was not found. Nothing to publish");
      return;
    }
    console.log("Markdown location: "+docsLocation);

    var themeLocation = path.join(projectBaseLocation, "theme")
    try {
      await fs.promises.access(themeLocation, fs.constants.F_OK)
      console.log("custom theme folder was found: "+themeLocation);
    } catch (e) {
      console.log("custom theme folder was not found. Default theme will be used");
      themeLocation = path.join(__dirname,"theme")
    }

    var databaseLocation = path.join(projectBaseLocation, "database.json")
    try {
      await fs.promises.access(databaseLocation, fs.constants.F_OK)
    } catch (e) {
      console.log("database.json was not found. Nothing to publish");
      return;
    }
    console.log("Database location: "+databaseLocation);

    await rimrafPromise(path.join(projectBaseLocation, siteFolder))
    await mkdirPromise(path.join(projectBaseLocation, siteFolder))
    await copyPromise(themeLocation, path.join(projectBaseLocation, siteFolder))
    await copyPromise(databaseLocation, path.join(projectBaseLocation, siteFolder, "database.json"))

    var settingsLocation = path.join(projectBaseLocation, "settings.ini");
    try {
      await fs.promises.access(settingsLocation, fs.constants.F_OK)
      await copyPromise(settingsLocation, path.join(projectBaseLocation, siteFolder, "settings.ini"))
      console.log("settings.ini location: "+settingsLocation);
    } catch (e) {
      console.log("settings.ini was not found. Nothing to publish");
      return;
    }

    var logoLocation = path.join(projectBaseLocation, "bootstraper-logo.png");
    try {
      await fs.promises.access(logoLocation, fs.constants.F_OK)
      await copyPromise(logoLocation, path.join(projectBaseLocation, siteFolder,"theme" , "assets", "img", "bootstraper-logo.png"))
      console.log("bootstraper-logo.png was update");
    } catch (e) {
      console.log("bootstraper-logo.png was not found. Nothing to publish");
      return;
    }

  }
}

module.exports = Publisher;
