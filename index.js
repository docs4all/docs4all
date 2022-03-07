var express = require('express');
var path = require('path');
const fs = require('fs');
var MarkdownDataSource = require('./MarkdownDataSource.js');
var app = express();

var markdownDataSource = new MarkdownDataSource();
markdownDataSource.setDocumentsBaseDir(path.join(__dirname, "docs"));
markdownDataSource.loadDocuments(markdownDataSource.getDocumentsBaseDir());
markdownDataSource.save();

var port = process.env.PORT || 8080;

app.use("/", express.static(__dirname+"/theme"));

app.get('/', function(req, res) {
    res.sendFile('index.html');
});

app.listen(port, function() {
    console.log('Our app is running on ' + port);
});
