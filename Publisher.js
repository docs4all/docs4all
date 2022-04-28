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

  this.start = async () => {
    console.log("Base location: "+projectBaseLocation);
    var docsLocation = path.join(projectBaseLocation, "docs");
    var customDocs = false;
    try {
      await fs.promises.access(docsLocation, fs.constants.F_OK)
      console.log("docs folder was found: "+docsLocation);
      customDocs = true;
    } catch (e) {
      console.log(e);
      customDocs = false;
    }
    if(customDocs===false){
      console.log("docs folder was not found. Nothing to publish");
      return;
    }

    var themeLocation = path.join(projectBaseLocation, "theme")
    try {
      await fs.promises.access(themeLocation, fs.constants.F_OK)
      console.log("custom theme folder was found: "+themeLocation);
    } catch (e) {
      console.log("theme folder was not found. Default theme will be used");
      themeLocation = path.join(__dirname,"theme")
    }

    var databaseLocation = path.join(projectBaseLocation, "database.json")
    try {
      await fs.promises.access(databaseLocation, fs.constants.F_OK)
      console.log("database.json was found: "+databaseLocation);
    } catch (e) {
      console.log("database.json was not found. Nothing to publish");
      return;
    }

    await rimrafPromise(path.join(projectBaseLocation, "site"))
    await mkdirPromise(path.join(projectBaseLocation, "site"))
    await copyPromise(themeLocation, path.join(projectBaseLocation, "site"))
    await copyPromise(databaseLocation, path.join(projectBaseLocation, "site", "database.json"))

    var uiSettingsLocation = path.join(projectBaseLocation, "ui-settings.json");
    try {
      await fs.promises.access(uiSettingsLocation, fs.constants.F_OK)
      await copyPromise(uiSettingsLocation, path.join(projectBaseLocation, "site", "ui-settings.json"))
      console.log("ui-settings.json was found");
    } catch (e) {
      console.log("ui-settings.json was not found. Nothing to publish");
      return;
    }

  }
}

module.exports = Publisher;
