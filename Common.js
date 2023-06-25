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
    var f = finder(__dirname);
    return f.next().value.name === "docs4all"
  } catch (e) {
    return false;
  } 
};

module.exports = Common;
