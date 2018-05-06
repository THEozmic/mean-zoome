var mongoose = require('mongoose');
var mongo = require('mongodb');
var passport = require('passport');
var config = require('../config/database');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var InfroUser = require("../models/InfroUser");
//var UserData = require("../models/User");

router.get('/:id', function(req, res, next) {
  var o_id = new mongo.ObjectID(req.params.id);
  InfroUser.findById(o_id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

module.exports = router;
