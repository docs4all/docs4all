var rimraf = require("rimraf");
var util = require("util");
const rimrafPromise = util.promisify(rimraf);

function Publisher{
  var projectBaseLocation = process.env.PWD;

  this.start = async () => {

    await rimrafPromise

  }
}

module.exports = Publisher;
