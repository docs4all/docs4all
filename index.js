var express = require('express');
var path = require('path');
const fs = require('fs');
var MarkdownDataSource = require('./MarkdownDataSource.js');
var app = express();

var markdownDataSource = new MarkdownDataSource();
markdownDataSource.setDocumentsBaseDir(path.join(__dirname, "docs"));
markdownDataSource.loadDocuments(markdownDataSource.getDocumentsBaseDir());
// console.log(markdownDataSource.getDocuments());
markdownDataSource.save();

// set the port of our application
var port = process.env.PORT || 8080;

// make express look in the public directory for assets (css/js/img)
app.use("/", express.static(__dirname+"/theme"));
app.use("/dist", express.static(__dirname+"/dist"));

// set the home page route
app.get('/', function(req, res) {
    res.sendFile('index.html');
});

app.listen(port, function() {
    console.log('Our app is running on ' + port);
});
