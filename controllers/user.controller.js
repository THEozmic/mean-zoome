
var UserData = require("../models/User");
var InfroUserData = require("../models/InfroUser");
var AssestController = require("../controllers/assets.controller");

exports.addNewUser = function(user, callback) {
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

 AssestController.addAssest(assest, function(err, assestSaveing){
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
  UserData.findOne({'email': user.email}, function (err, userRes) {
    if (err) return callback(err); //next(err);

    if (userRes){
      userRes.name = user.name;
      userRes.phone = user.phone;
      userRes.Assets_id_list.push(user.Assets_id_list);
      userRes.save(function(err, userSaveing) {
        if (err) return callback(err);

        callback(err, userSaveing);
      });

      if (user.isAddAsset){
        var assest = {
          owner_id: userRes._id,
          RequestDate: user.RequestDate,
          typeUser: user.typeUser,
          city: user.city,
          zone: user.zone,
          assetType: user.assetType,
          budget: user.budget,
          numRooms: user.numRooms,
          isNewAsset: user.isNewAsset
        };

        AssestController.addAssest(assest, function(err, assestSaveing) {
          if (err) {
            //return res.json({success: false, msg: 'Save assest failed.'});
          } else {
            UserData.findOne({ _id: assestSaveing.owner_id}, function (err, userResd) {
              if (err) {
                //return res.json({success: false, msg: 'Save assest failed.'});
              } else {
                userResd.Assets_id_list.push(assestSaveing._id);
                userResd.save(function (err) {
                  if (err){}

                  AssestController.culcMatchPerce(assest.owner_id);
                });
                //callback();
              }
            });
          }


        });


      }


    } else {
      var newUser = new UserData({
        name: user.name,
        phone: user.phone,
        email: user.email,
        Assets_id_list: user.Assets_id_list
      });
      newUser.save(function(err, userSaveing) {
        if (err) return callback(err);

        var newInfro = new InfroUserData({
          user_id: userSaveing._id
        });
        
        /// for test
        if (user.isMarried){
          newInfro.isMarried = user.isMarried;
        }
        if (user.spousesName){
          newInfro.spousesName = user.spousesName;
        }
        if (user.numChildren){
          newInfro.numChildren = user.numChildren;
        }
        if (user.dateOfBirth){
          newInfro.dateOfBirth = user.dateOfBirth;
        }
        if (user.revenue){
          newInfro.revenue = user.revenue;
        }
        if (user.investmentsAbroad){
          newInfro.investmentsAbroad = user.investmentsAbroad;
        }
        /// end

        newInfro.save(function(err, infroUserSaveing) {
          if (err) return callback(err);

          userSaveing.InfroUser_id = infroUserSaveing._id;

          userSaveing.save(function(err, UserSaveingB) {
            if (err) return callback(err);

            callback(err, UserSaveingB);
          })
        });

        if (user.isAddAsset){
          var assest = {
            owner_id: userSaveing._id,
            RequestDate: user.RequestDate,
            typeUser: user.typeUser,
            city: user.city,
            zone: user.zone,
            assetType: user.assetType,
            budget: user.budget,
            numRooms: user.numRooms,
            isNewAsset: user.isNewAsset
          };

          AssestController.addAssest(assest, function(err, assestSaveing) {
            if (err) {
              //return res.json({success: false, msg: 'Save assest failed.'});
            } else {
              UserData.findOne({ _id: assestSaveing.owner_id}).exec(function (err, user) {
                if (user){
                  user.Assets_id_list.push(assestSaveing._id);
                  user.save(function (err) { /* all done */ });
                }
              });


            }


          });


        }
      });
    }
  });
};
exports.removeUser = function(userId, callback) {
  UserData.findById(userId , function (err, userRes) {
    if (err) return callback(err);

    if (userRes){
      var InfroUser_id = userRes.InfroUser_id;
      var Assets_id_list = userRes.Assets_id_list;

      UserData.deleteOne({'_id': userRes._id}, function (err, results) {
        if (err) return next(err);

        callback(err, InfroUser_id, Assets_id_list)
      });
    }


  });
};
