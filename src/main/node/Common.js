var fs = require("fs");
var finder = require('find-package-json');

function Common(){}

Common.fileExist = async function (absoluteFileLocation) {
  try {
    await fs.promises.access(absoluteFileLocation, fs.constants.F_OK)
    return true;
  } catch (e) {
    return false;
  } 
};

Common.isRunningFromWithinDocs4All = async function () {
  try {
    var f = finder(process.env.PWD);
    return f.next().value.name === "docs4all"
  } catch (e) {
    return false;
  } 
};

Common.isValidHttpUrl = function (string) {
  try {
    var url = new URL(string);
    return true;
  } catch (_) {
    return false;  
  }
}

Common.isImage = function (rawFileLocation) {
  return rawFileLocation.match(/\.(jpg|jpeg|png|gif)$/i);
}

module.exports = Common;
