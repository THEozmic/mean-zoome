var mongoose = require('mongoose');
var mongo = require('mongodb');
var passport = require('passport');
var config = require('../config/database');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();

var nodemailer = require('nodemailer');

var fromSendMail = 'zoometest123@gmail.com';
var toSendMail = 'mosheng1484@gmail.com';
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: fromSendMail,
    pass: 'zoometest'
  }
});

var UserData = require("../models/User");
var InfroUserData = require("../models/InfroUser");
var MarketingMsgData = require("../models/marketing-message.model");

var UserController = require("../controllers/user.controller");
var AssetsController = require("../controllers/assets.controller");
var InformationAnalysis = require("../controllers/information-analysis.controller");

var isMarriedenums = ['', 'MARRIED','DIVORCEE', 'WIDOWER', 'SINGLE'];

function randomByNumber(endNum) {
  if (endNum && endNum > 0){
    return Math.floor((Math.random() * endNum));
  }

  return 0;
}
router.post('/', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var user = {
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      Assets_id_list: []
    };

    if (req.body.isAddAsset){

      var assest = {
        RequestDate: req.body.RequestDate,
        msg: req.body.msg,
        typeUser: req.body.typeUser,
        city: req.body.city,
        zone: req.body.zone,
        assetType: req.body.assetType,
        budget: req.body.budget,
        numRooms: req.body.numRooms,
        isNewAsset: req.body.isNewAsset
      };

      AssetsController.addAssest(assest, function(err, assestSaveing){
        if (err) {
          return res.json({success: false, msg: 'Save assest failed.'});
        }

        user.Assets_id_list.push(assestSaveing._id);
        user.isMarried = isMarriedenums[randomByNumber(isMarriedenums.length)];
        if (req.body.isMarried){
          user.isMarried = req.body.isMarried;
        }
        if (req.body.spousesName){
          user.spousesName = req.body.spousesName;
        }
        user.numChildren = randomByNumber(5);
        if (req.body.numChildren){
          user.numChildren = req.body.numChildren;
        }
        if (req.body.dateOfBirth){
          user.dateOfBirth = req.body.dateOfBirth;
        }
        user.revenue = randomByNumber(25000).toString();
        if (req.body.revenue){
          user.revenue = req.body.revenue;
        }
        user.investmentsAbroad = (randomByNumber(1) == 0) ? 'YES' : '';
        if (req.body.investmentsAbroad){
          user.investmentsAbroad = req.body.investmentsAbroad;
        }
        UserController.addNewUser(user, function(err, userSaveing){
          if (err) {
            return res.json({success: false, msg: 'Save user failed.'});
          }


          if (userSaveing){

            assestSaveing.owner_id = userSaveing._id;

            InformationAnalysis.analysisAction(userSaveing._id, function (msg) {
              //res.json({success: true, msg: msg});
            });

            assestSaveing.save(function (err,post) {
              if (err) {

              }
            });
            //assest.save();

          }
          res.json({success: true, msg: 'Successful created new user.'});
        });
      });
    } else {
      UserController.addNewUser(user, function(err, userSaveing){
        if (err) {
          return res.json({success: false, msg: 'Save user failed.'});
        }

        res.json({success: true, msg: 'Successful created new user.'});
      });
    }

    /*var newUser = new UserData({
      RequestDate: req.body.RequestDate,
      typeUser: req.body.typeUser,
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      city: req.body.city,
      zone: req.body.zone,
      assetType: req.body.assetType,
      budget: req.body.budget,
      numRooms: req.body.numRooms,
      isNewAsset: req.body.isNewAsset

    });
    newUser.save(function(err, userSaveing) {
      if (err) {
        return res.json({success: false, msg: 'Save user failed.'});
      }

      var newInfro = new InfroUserData({
        user_id: userSaveing._id
      });

      newInfro.save(function(err, infroUserSaveing) {
        if (err) {
          return res.json({success: false, msg: 'Save user failed.'});
        }

        userSaveing.InfroUser_id = infroUserSaveing._id;

        userSaveing.save(function(err, infroUserSaveing) {
          if (err) {
            return res.json({success: false, msg: 'Save user failed.'});
          }
          res.json({success: true, msg: 'Successful created new user.'}); //, data: userSaveing
        })
      });
    });*/
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});
router.post('/list', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    console.log(req.body);

    for (var user of req.body){
      UserController.addNewUser(user, function(err, userSaveing){
        if (err) {
          return res.json({success: false, msg: 'Save user failed.'});
        }

        //res.json({success: true, msg: 'Successful created new user.'});
      });


      /*if (user.isAddAsset){

        var assest = {
          RequestDate: user.RequestDate,
          typeUser: user.typeUser,
          city: user.city,
          zone: user.zone,
          assetType: user.assetType,
          budget: user.budget,
          numRooms: user.numRooms,
          isNewAsset: user.isNewAsset
        };

       AssetsController.addAssest(assest, function(err, assestSaveing){
          if (err) {
            return res.json({success: false, msg: 'Save assest failed.'});
          }

          var newUser = {
            name: user.name,
            phone: user.phone,
            email: user.email,
            Assets_id_list: []
          };
          newUser.Assets_id_list.push(assestSaveing._id);
          UserController.addNewUser(newUser, function(err, userSaveing){
            if (err) {
              return res.json({success: false, msg: 'Save user failed.'});
            }

            //res.json({success: true, msg: 'Successful created new user.'});
          });
        });
      } else {
        var newUser = {
          name: user.name,
          phone: user.phone,
          email: user.email,
          Assets_id_list: []
        };
        UserController.addNewUser(newUser, function(err, userSaveing){
          if (err) {
            return res.json({success: false, msg: 'Save user failed.'});
          }

          //res.json({success: true, msg: 'Successful created new user.'});
        });
      }*/



      /*var newUser = new UserData({
        RequestDate: user.RequestDate,
        typeUser: user.typeUser,
        name: user.name,
        phone: user.phone,
        email: user.email,
        city: user.city,
        zone: user.zone,
        assetType: user.assetType,
        budget: user.budget,
        numRooms: user.numRooms,
        isNewAsset: user.isNewAsset

      });

      newUser.save(function(err, userSaveing) {
        if (err) {
          //return res.json({success: false, msg: 'Save user failed.'});
        }

        var newInfro = new InfroUserData({
          user_id: userSaveing._id
        });

        newInfro.save(function(err, infroUserSaveing) {
          if (err) {
            //return res.json({success: false, msg: 'Save user failed.'});
          }

          userSaveing.InfroUser_id = infroUserSaveing._id;

          userSaveing.save(function(err, infroUserSaveing) {
            if (err) {
              //return res.json({success: false, msg: 'Save user failed.'});
            }
            //res.json({success: true, msg: 'Successful created new user.'}); //, data: userSaveing
          })
        });
      });*/
    }



  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }

  res.json({success: true, msg: 'Successful created new user.'});
});
router.post('/remove', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    console.log(req.body);
    var o_id = new mongo.ObjectID(req.body.userId);


    /*UserData.deleteOne({'_id': o_id}, function (err, results) {
      if (err) return next(err);

      res.json({success: true, msg: 'Successful Remove user.'}); //, data: userSaveing
    });
*/
    UserController.removeUser(o_id, function(err, InfroUser_id, Assets_id_list){
      if (err) {
        return res.json({success: false, msg: 'Save user failed.'});
      }

      AssetsController.removeAssetsList(Assets_id_list, function(err, assestSaveing) {
        if (err) {
          //return res.json({success: false, msg: 'Save assest failed.'});
        }
      });

      //TODO remove infro
      res.json({success: true, msg: 'Successful cremove user.'});
    });


  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});
router.get('/', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    UserData.find(function (err, users) {
      if (err) return next(err);

      function removeUsers(users) {
        for (var user of users){
          user.remove();
        }
      }

      //removeUsers(users);


      res.json(users);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});
router.get('/account/:id', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var o_id = new mongo.ObjectID(req.params.id);

    UserData.findOne({_id: req.params.id})
      .populate('InfroUser_id')
      .populate('Assets_id_list')
      .populate({
        path: 'rules_id_list',
        // Get friends of friends - populate the 'friends' array for every friend
        populate: [
          { path: 'keyword_id' },
          { path: 'serviceProvider_id' }
        ]

      })
      .populate({
        path: 'marketing_msg_list' ,
        // Get friends of friends - populate the 'friends' array for every friend
        populate: [
          { path: 'typeMsg' }
       ]
    }).exec(function (err, result) {
        //if (err) return next(err);

      //console.log(err);
        res.json(result);
      });


   /* UserData.findById(o_id, function (err, post) {
      if (err) return next(err);

      res.json(post);
    });*/
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});
router.get('/:id', function(req, res, next) {
  var o_id = new mongo.ObjectID(req.params.id);
  UserData.findById(o_id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
router.put('/:id', function(req, res, next) {
  var o_id = new mongo.ObjectID(req.params.id);
  UserData.findById(o_id, function (err, userRes) {
    if (err) return next(err);

    if(userRes){
      userRes.name = req.body.name;
      userRes.phone = req.body.phone;
      userRes.email = req.body.email;

      userRes.save(function (err,post) {
        res.json(post);
      });
    }
  });

  /*UserData.findByIdAndUpdate(o_id, newUser, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });*/
});
router.post('/sendMail', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    console.log(req.body);
    var o_id = new mongo.ObjectID(req.body.userId);
    UserData.findById({'_id': o_id}, function (err, user) {
      if (err) return next(err);

      if (user){
        var email = user.email;
        var name = user.name;

        var mailOptions = {
          from: fromSendMail,
          to: toSendMail,
          subject: 'Test',
          text: 'test test test test test....'
        };
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
        //TODO: send to maile

        user.lastSentMailRegistration = Date.now();
        user.numSentMailRegistration++;
        user.save(function (err, user){

          res.json({success: true, msg: 'Sent email to - ' + email + '.'});
        });
      }
    });

  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.post('/sendMarketingMail', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var ruleId = req.body.ruleId;

    UserData.findOne({_id: req.body.userId})
      .populate({path: 'rules_id_list'})
      .exec(function (err, user) {
        if (err) return next(err);

        if (user){
          //TODO:send email
          var typeMsg = '';
          for (var i = 0; i < user.rules_id_list.length; i++){
            if (user.rules_id_list[i]._id.toString() == ruleId){
              typeMsg = user.rules_id_list[i].serviceProvider_id;
              break;
            }
          }

          var isOpenLink = Math.random() >= 0.5;
          var isSendMore = isOpenLink && Math.random() >= 0.3;
          var msgData = new MarketingMsgData({
            typeMsg: typeMsg,
            isOpenLink: isOpenLink,
            isSendMore: isSendMore
          });
          msgData.save(function (err, msg){
            user.marketing_msg_list.push(msg._id);
            user.save(function (err, userSaveing){
              res.json({success: true, msg: 'Sent email to - ' + userSaveing.name + '.'});
            });
          });


        }
      });





    /*UserData.findById({'_id': o_id}, function (err, user) {
      if (err) return next(err);


     /!* if (user){


        var email = user.email;
        var name = user.name;


        var mailOptions = {
          from: fromSendMail,
          to: toSendMail,
          subject: 'הודעה שיווקית מזומי',
          text: 'test test test test test....'
        };
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
        //TODO: send to maile

        user.lastSentMailRegistration = Date.now();
        user.numSentMailRegistration++;
        user.save(function (err, user){

          res.json({success: true, msg: 'Sent email to - ' + email + '.'});
        });
      }*!/
    });*/

  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});
router.post('/changeIsRegistered', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    console.log(req.body);
    var o_id = new mongo.ObjectID(req.body.userId);
    UserData.findById({'_id': o_id}, function (err, user) {
      if (err) return next(err);

      if (user){
        user.isRegistered = req.body.isRegistered;
        user.save(function (err, user){

          res.json({success: true, msg: 'Save change.'});
        });
      }
    });

  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.post('/informationAnalysis', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    InformationAnalysis.analysisAction(req.body.userId, function (msg) {
      res.json({success: true, msg: msg});
    });


   /*
   console.log(req.body);
    var o_id = new mongo.ObjectID(req.body.userId);
    UserData.findById(o_id)
      .populate('Assets_id_list')
      .exec(function (err, userResult) {
        if (err) return next(err);

        InformationAnalysis.Action(userResult.Assets_id_list, function(err, rulesRes_id){
          if (err) {
            return res.json({success: false, msg: 'Failed information analysis.'});
          }

          userResult.rules_id_list = rulesRes_id;
          userResult.timeAnalysis = Date.now();
          userResult.save(function (err, data) {
            res.json({success: true, msg: 'Successful information analysis.'});
          });
        });
      });

      */
    /*UserData.findById({'_id': o_id}, function (err, user) {
      if (err) return next(err);

      if (user){

        res.json({success: true, msg: 'Successful information analysis.'});

       /!*
       user.isRegistered = req.body.isRegistered;
        user.save(function (err, user){

          res.json({success: true, msg: 'Save change.'});
        });*!/
      }
    });*/

  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
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
