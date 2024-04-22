var fs = require("fs");
var path = require("path");
var MarkdownDataSource = require('./MarkdownDataSource.js');
var Common = require("./Common.js");

function Builder(){
  var projectBaseLocation = process.env.PWD;
  var markdownFolder = process.env.DOCS4ALL_MARKDOWN_FOLDER ||"markdown";

  this.start = async () => {
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
    }else{
    
      if(isRunningFromWithinDocs4All){
        //pre build database will be used
        databaseLocation = path.join(projectBaseLocation, "database.json");                        
      }else{
        databaseLocation = path.join(projectBaseLocation, "node_modules", "docs4all", "database.json");        
      }
      console.log("markdown folder was not found. Default database will be used: "+databaseLocation); 
    }

    //generate the database
    var markdownDataSource = new MarkdownDataSource(databaseLocation);
    await markdownDataSource.safeInit();
    markdownDataSource.setDocumentsBaseDir(markdownLocation);
    markdownDataSource.loadDocuments(markdownDataSource.getDocumentsBaseDir());
    console.log("markdown files were scanned and parsed"); 
    markdownDataSource.save();
    //if everything is ok, databaseLocation should contain a json file    

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

    //clear filename
    var databaseAsString = await fs.promises.readFile(databaseLocation, {encoding: "utf8"});
    var newDatabaseString = databaseAsString.replace(databaseLocation, 'database.json');
    await fs.promises.writeFile(databaseLocation, newDatabaseString, 'utf8');

    return {
      databaseLocation, themeLocation
    }
  }
}

module.exports = Builder;
