function ApiClient(){

  var apiBaseUrl = getLocationBasePath();
  var database = new loki('database.db');

  this.init = () => {
    console.log("Loading database...");
    return new Promise(function(resolve, reject) {
      $.getJSON("./database.json", function(data) {
        database.loadJSONObject(data);
        resolve()
      }).fail(function() {
        console.log("An error has occurred.");
        reject();
      });
    });
  }

  this.findAll = () => {
    return new Promise(function(resolve, reject) {
      resolve(database.getCollection('documents').data);
    });
  };

  // this.getTreeMenuByAudienceTargetType = () => {
  //   //add sort param
  //   var url = `${apiBaseUrl}/api/menu-tree`;
  //   url = addParam(url, "audienceTarget", "user");
  //   return new Promise(function(resolve, reject) {
  //       $.ajax({
  //         url: url,
  //         type: "GET",
  //         dataType: "JSON",
  //         success: function(data) {
  //           resolve(data);
  //         }
  //       });
  //   });
  // };

  this.findDocumentByPath = (path) => {
    return new Promise(function(resolve, reject) {
      var query = [
        {
          "path": path
        }
      ]

      var documents = database.getCollection('documents');
      var results = documents.find({
        $and: query
      });
      resolve(results)
    });
  };

  this.findDocumentByContent = (resource, text) => {
    var url = `${apiBaseUrl}/api/${resource}/content`;
    return new Promise(function(resolve, reject) {
        $.ajax({
          url: url,
          type: "POST",
          data: JSON.stringify({"text":text}),
          contentType:"application/json; charset=utf-8",
          dataType: "JSON",
          success: function(data) {
            resolve(data);
          }
        });
    });
  };


  /**
  * Add a URL parameter
  * @param {string} url
  * @param {string} param the key to set
  * @param {string} value
  */
  function addParam(url, param, value) {
     param = encodeURIComponent(param);
     var a = document.createElement('a');
     param += (value ? "=" + encodeURIComponent(value) : "");
     a.href = url;
     a.search += (a.search ? "&" : "") + param;
     return a.href;
  }

  function getLocationBasePath() {

    if (typeof window === "undefined") {
      console.error("ReferenceError: window is not defined. Are you in frontend javascript layer?");
      return;
    }

    if (typeof window.location === "undefined") {
      console.error("ReferenceError: window.location is not defined. Are you in frontend javascript layer?");
      return;
    }

    if(window.location.port){
      return window.location.protocol+"//"+window.location.hostname+":"+window.location.port
    }else {
      return window.location.protocol+"//"+window.location.hostname
    }
  }

}

if(typeof window._context === 'undefined'){
   window._context = {};
}
window._context["ApiClient"] =  new ApiClient();
