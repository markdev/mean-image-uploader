var mongoose = require('mongoose');
//exports.users = require('../controllers/users');

var UserSchema = require('../models/User').User
  , User = mongoose.model('User')

exports.User = mongoose.model('User');
exports.users = require('../controllers/users');