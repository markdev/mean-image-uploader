var mongoose = require('mongoose');

exports.users = require('../controllers/users');
exports.User = mongoose.model('User');
exports.contests = require('../controllers/contests');
exports.Contest = mongoose.model('Contest');
exports.entries = require('../controllers/entries');
exports.Entry = mongoose.model('Entry');


