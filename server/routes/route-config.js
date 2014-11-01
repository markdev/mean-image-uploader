var mongoose = require('mongoose');
//exports.users = require('../controllers/users');

var UserSchema = require('../models/User').User
  , User = mongoose.model('User')

exports.User = mongoose.model('User');
exports.users = require('../controllers/users');

exports.Contest = mongoose.model('Contest');
exports.contests = require('../controllers/contests');