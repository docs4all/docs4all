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
const yaml = require('js-yaml');

function Publisher(){
  var projectBaseLocation = process.env.PWD;
  var siteFolder = process.env.DOCS4ALL_SITE_FOLDER ||"site";

  this.start = async () => {
    var builder = new Builder();
    var builderResponse = await builder.start();
    var databaseLocation = builderResponse.databaseLocation;
    var themeLocation = builderResponse.themeLocation;    
    var publishLocation = path.join(projectBaseLocation, siteFolder);

    var settings;
    if(await Common.fileExist(path.join(process.cwd(), "settings.yaml"))){
      var rawContent = await fs.promises.readFile(path.join(process.cwd(), "settings.yaml"), "utf8");
      settings = yaml.load(rawContent)
    }    

    await rimrafPromise(publishLocation)
    console.log("publish folder was deleted: "+publishLocation)
    await mkdirPromise(publishLocation)
    await copyPromise(themeLocation, publishLocation)
    await copyPromise(databaseLocation, path.join(publishLocation, "database.json"))

    var customImageLogoFileExist = false;
    if(settings.logo && settings.logo.startsWith(".") && 
        await Common.fileExist(path.join(process.cwd(), settings.logo)) && Common.isImage(settings.logo)){
      console.log("custom image logo was found:"+path.join(process.cwd(), settings.logo));    
      await copyPromise(path.join(process.cwd(), settings.logo), path.join(publishLocation, "assets/img/bootstraper-logo.png"))
      customImageLogoFileExist = true;
    }else{
      console.log("custom image logo was not found"); 
      customImageLogoFileExist = false;    
    }

    //index.html customizations
    var content = await fs.promises.readFile(path.join(publishLocation, 'index.html'), "utf8");
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
    
    fs.promises.writeFile(path.join(publishLocation, 'index.html'), content);
  }
}

module.exports = Publisher;
