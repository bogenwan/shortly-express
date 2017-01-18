var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');



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
    var context = this;
    bcrypt.hash(inputPassword, null, null, function(err, hash) {
      if (err) {
        // console.log(err);
      } else {
        console.log('this is the response =>', hash);
        context.set('password', hash);
        // callback(hash);
      }
    });
  },
});

module.exports = User;