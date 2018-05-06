var mongoose = require('mongoose');
var mongo = require('mongodb');
var passport = require('passport');
var config = require('../config/database');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();

var AssetsData = require("../models/assets");
var UserData = require("../models/User");

var AssetsController = require("../controllers/assets.controller");


router.get('/', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    AssetsData.find(function (err, assets) {
      if (err) return next(err);

      res.json(assets);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.post('/', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {

    var assets = req.body;

    var owner_id = assets.owner_id;
    if (owner_id){
      owner_id = new mongo.ObjectID(owner_id);
    }

    var assetsData = new AssetsData({
      RequestDate: assets.RequestDate,
      typeUser: assets.typeUser,
      city: assets.city,
      msg: assets.msg,
      zone: assets.zone,
      assetType: assets.assetType,
      budget: assets.budget,
      numRooms: assets.numRooms,
      isNewAsset: assets.isNewAsset,
      owner_id: owner_id
    });
    assetsData.save(function(err, assetsSaveing){
      if (err) {
        return res.json({success: false, msg: 'Save user failed.'});
      }

      if (assetsSaveing.owner_id){
        UserData.update(
          {'_id': assetsSaveing.owner_id},
          { $push: { "Assets_id_list" :  assetsSaveing._id  } },
          function( err) {
            if (err) return next(err);


          }
        );
      }

      res.json({success: true, msg: 'Successful created new assets.'});
    });

  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.get('/:idList', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var lisrId = req.params.idList.split(',');

    AssetsData.find({"_id":{$in: lisrId} }, function (err, assList) {
      if (err) return next(err);

      res.json(assList);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});
router.post('/remove', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    console.log(req.body);
    var o_id = new mongo.ObjectID(req.body.assetsId);
    AssetsController.removeAssets(o_id, function(err){
      if (err) {
        return res.json({success: false, msg: 'Save user failed.'});
      }

      res.json({success: true, msg: 'Successful remove assets.'});
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.put('/:id', function(req, res, next) {
  var o_id = new mongo.ObjectID(req.params.id);
  AssetsData.findById(o_id, function (err, assetsRes) {
    if (err) return next(err);

    if(assetsRes){
      var assets = req.body;

      assetsRes.RequestDate = assets.RequestDate;
      assetsRes.typeUser = assets.typeUser;
      assetsRes.city = assets.city;
      assetsRes.zone = assets.zone;
      assetsRes.assetType = assets.assetType;
      assetsRes.budget = assets.budget;
      assetsRes.numRooms = assets.numRooms;
      assetsRes.isNewAsset = assets.isNewAsset;


      assetsRes.save(function (err,post) {
        res.json(post);
      });
    }
  });

  /*UserData.findByIdAndUpdate(o_id, newUser, function (err, post) {
   if (err) return next(err);
   res.json(post);
   });*/
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
