var mongoose = require('mongoose');
//exports.users = require('../controllers/users');

var UserSchema = require('../models/User').User
  , User = mongoose.model('User')

var ContestSchema = require('../models/Contest').Contest
  , Contest = mongoose.model('Contest')

var EntrySchema = require('../models/Entry').Entry
  , Entry = mongoose.model('Entry')

exports.User = mongoose.model('User');
exports.users = require('../controllers/users');

exports.Contest = mongoose.model('Contest');
exports.contests = require('../controllers/contests');

exports.Entry = mongoose.model('Entry');
exports.entries = require('../controllers/entries');