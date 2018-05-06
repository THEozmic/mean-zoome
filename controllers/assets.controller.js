
var AssestData = require("../models/assets");
var UserData = require("../models/User");

exports.culcMatchPerce = function (userId) {
  //UserData.findOne({'_id': userId}).populate({path});
};
exports.addAssest = function(assest, callback) {
  var newAssest = new AssestData({
    owner_id: assest.owner_id,
    RequestDate: assest.RequestDate,
    msg: assest.msg ? assest.msg : '',
    typeUser: assest.typeUser,
    city: assest.city,
    zone: assest.zone,
    assetType: assest.assetType,
    budget: assest.budget,
    numRooms: assest.numRooms,
    isNewAsset: assest.isNewAsset
  });
  newAssest.save(function(err, userSaveing) {
    if (err) return callback(err);


    callback(err, userSaveing);
  });
};
exports.removeAssetsList = function(assest_id_list, callback) {
  AssestData.remove({"_id":{$in: assest_id_list} }, function (err, results) {
    if (err) return next(err);

    callback(err, results)
  });


  /*for (var i = 0; i < assest_id_list.length; i++){
    UserData.deleteOne({'_id': assest_id_list[i]}, function (err, results) {


      callback(err, results)
    });
  }*/
};

exports.removeAssets = function(assest_id, callback) {
  AssestData.findById(assest_id, function (err, assets) {
    if (err) return next(err);

    if (assets){
      var ownerId = assets.owner_id;

      if (ownerId){
        UserData.update(
          {'_id': ownerId},
          { $pull: { "Assets_id_list" :  assets._id  } },
          function( err, user ) {
            if (err) return next(err);
          }
        );
      }


      assets.remove(function (err, results){
        if (err) return next(err);

        callback(err);
      });
    }

  });


 /* AssestData.remove({"_id": assest_id}, function (err, results) {
    if (err) return next(err);

    callback(err, results)
  });*/


  /*for (var i = 0; i < assest_id_list.length; i++){
   UserData.deleteOne({'_id': assest_id_list[i]}, function (err, results) {


   callback(err, results)
   });
   }*/
};
