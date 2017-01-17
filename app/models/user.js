var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var saltRounds = 10;


var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,

  initialize: function() {
    this.on('creating', this.hashPassword);
  },

  comparePassword: function (inputPassword, callback) {
    var hashedPassword = hashPassword(inputPassword, function() {      
      bcrypt.compare(hashedPassword, this.get('password'), function( err, res) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, res);
        }
      });
    });
  },

  hashPassword: function(inputPassword, callback) {
    bcrypt.hash(inputPassword, saltRounds, null, function(err, res) {
      if (err) {
        console.log(err);
      } else {
        console.log('this is the response =>', res);
        this.set({password: res});
        callback(res);
      }
    });
  },
});

module.exports = User;