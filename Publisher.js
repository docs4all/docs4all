var rimraf = require("rimraf");
var util = require("util");
var fs = require("fs");
var fsExtra = require("fs-extra");
var path = require("path");
const Builder = require("./Builder.js");
var Common = require("./Common.js");
const rimrafPromise = util.promisify(rimraf);
const mkdirPromise = util.promisify(fs.mkdir);
const copyPromise = util.promisify(fsExtra.copy);

function Publisher(){
  var projectBaseLocation = process.env.PWD;
  var siteFolder = process.env.DOCS4ALL_SITE_FOLDER ||"site";

  this.start = async () => {
    var builder = new Builder();
    var builderResponse = await builder.start();
    var databaseLocation = builderResponse.databaseLocation;
    var themeLocation = builderResponse.themeLocation;    

    await rimrafPromise(path.join(projectBaseLocation, siteFolder))
    await mkdirPromise(path.join(projectBaseLocation, siteFolder))
    await copyPromise(themeLocation, path.join(projectBaseLocation, siteFolder))
    await copyPromise(databaseLocation, path.join(projectBaseLocation, siteFolder, "database.json"))

    var settingsLocation = path.join(projectBaseLocation, "settings.ini");
    if(await Common.fileExist(settingsLocation)){
      var finalSettingsLocation = path.join(projectBaseLocation, siteFolder, "settings.ini");
      await copyPromise(settingsLocation, finalSettingsLocation)
      console.log("settings.ini was published: "+finalSettingsLocation);
    }    

    var logoFileLocation = path.join(projectBaseLocation, "bootstraper-logo.png");
    if(await Common.fileExist(logoFileLocation)){
      var finalLogoLocation = path.join(projectBaseLocation, siteFolder,"theme" , "assets", "img", "bootstraper-logo.png");
      await copyPromise(logoLocation, finalLogoLocation)
      console.log("bootstraper-logo.png was published: "+finalLogoLocation);
    }
  }
}

module.exports = Publisher;
