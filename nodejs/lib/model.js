// Generated by CoffeeScript 1.4.0

/* Object representing a model file on Shapeways
*/


(function() {
  var Auth, Model, auth, cfg, fs;

  cfg = require('../cfg/config.js');

  Auth = (require('./auth.js')).Auth;

  fs = require('fs');

  auth = new Auth;

  exports.Model = Model = (function() {

    function Model() {}

    Model.prototype.getModels = function(oauth_access_token, oauth_access_token_secret, callback) {
      return auth.oa.getProtectedResource("http://api." + cfg.API_SERVER + "/model/" + cfg.API_VERSION, 'GET', oauth_access_token, oauth_access_token_secret, function(error, data, response) {
        if (error) {
          console.log('error :' + JSON.stringify(error));
        }
        return callback(data);
      });
    };

    Model.prototype.getModel = function(id, oauth_access_token, oauth_access_token_secret, callback) {
      return auth.oa.getProtectedResource("http://api." + cfg.API_SERVER + "/model/" + id + "/" + cfg.API_VERSION, 'GET', oauth_access_token, oauth_access_token_secret, function(error, data, response) {
        if (error) {
          console.log('error :' + JSON.stringify(error));
        }
        return callback(data);
      });
    };

    Model.prototype.putModel = function(file, oauth_access_token, oauth_access_token_secret, callback) {
      var model_upload;
      return model_upload = fs.readFile(file.path, function(err, fileData) {
        var upload;
        fileData = encodeURIComponent(fileData.toString('base64'));
        upload = JSON.stringify({
          file: fileData,
          fileName: file.name,
          ownOrAuthorizedModel: 1,
          acceptTermsAndConditions: 1
        });
        return auth.oa.post("http://api." + cfg.API_SERVER + "/model/" + cfg.API_VERSION, oauth_access_token, oauth_access_token_secret, upload, function(error, data, response) {
          if (error) {
            console.log('error: ' + JSON.stringify(error));
            return console.log(error);
          } else {
            return callback(data);
          }
        });
      });
    };

    return Model;

  })();

}).call(this);
