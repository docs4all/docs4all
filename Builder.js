var fs = require("fs");
var path = require("path");
var MarkdownDataSource = require('./MarkdownDataSource.js');

function Builder(){
  var projectBaseLocation = process.env.PWD;

  this.start = async () => {
    console.log("Base location: "+projectBaseLocation);
    var docsLocation = path.join(projectBaseLocation, "docs");
    var customDocs = false;
    try {
      await fs.promises.access(docsLocation, fs.constants.F_OK)
      customDocs = true;
    } catch (e) {
      console.log(e);
      customDocs = false;
    }
    if(customDocs===false){
      console.log("docs folder was not found. Nothing to publish");
      return;
    }

    var databaseLocation = path.join(projectBaseLocation, "database.json")
    try {
      await fs.promises.access(databaseLocation, fs.constants.F_OK)
    } catch (e) {
      console.log("database.json was not found. Nothing to build");
      return;
    }

    var databaseLocation;
    if(customDocs===true){
      databaseLocation = path.join(projectBaseLocation, "database.json")
    }else{
      path.join(projectBaseLocation, "node_modules", "docs4all", "database.json")
    }

    var markdownDataSource = new MarkdownDataSource(databaseLocation);
    markdownDataSource.setDocumentsBaseDir(docsLocation);
    markdownDataSource.loadDocuments(markdownDataSource.getDocumentsBaseDir());
    markdownDataSource.save();

  }
}

module.exports = Builder;
