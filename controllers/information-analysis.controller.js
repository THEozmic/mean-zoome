var rules = [
  { word: 'דירת-גן', serviceProvider: 'גנן', matchPerce: 86 },
  { word: 'שותפים', serviceProvider: 'ניהול בתים משותפים', matchPerce: 82 },
  { word: 'כלב', serviceProvider: 'מוצרים לחיות', matchPerce: 91 },
  { word: 'חתול', serviceProvider: 'מוצרים לחיות', matchPerce: 85 },
  { word: 'בעלי חיים', serviceProvider: 'מוצרים לחיות', matchPerce: 93 },
  { word: 'מפנים את דירתנו', serviceProvider: 'הובלות', matchPerce: 100 },
  { word: 'חניה', serviceProvider: 'מוצרים לרכב', matchPerce: 70 },
  { word: 'פינוי', serviceProvider: 'הובלות', matchPerce: 78 },
  { word: 'דירת גג', serviceProvider: 'רעפים', matchPerce: 50 },
  { word: 'דירת גג', serviceProvider: 'ריהוט גג', matchPerce: 81 },
  { word: 'מוכר', serviceProvider: 'עו"ד נדל"ן', matchPerce: 90 },
  { word: 'לקניה', serviceProvider: 'עו"ד נדל"ן', matchPerce: 90 }
  /*{ word: '', serviceProvider: '', matchPerce: 0 },*/
];

var mongoose = require('mongoose');
var mongo = require('mongodb');

var KeywordsModel = require("../models/rules/keywords.model");
var ServiceProviderModel = require("../models/rules/service-provider.model");
var RulesModel = require("../models/rules/rules.model");
var UserData = require("../models/User");

function AddKeywords(word, callback) {
  KeywordsModel.findOne({ word: word}).exec(function (err, keywordRes) {
    if (keywordRes){
      callback(err, keywordRes);
    } else {
      var newKeywords = new KeywordsModel({
        word: word
      });
      newKeywords.save(function (err, res){
        callback(err, res);
      });
    }
  });
}
function AddServiceProvider(serviceProvider, callback) {
  ServiceProviderModel.findOne({ serviceType: serviceProvider}).exec(function (err, serviceProviderRes) {
    if (serviceProviderRes){
      callback(err, serviceProviderRes);
    } else {
      var newServiceProvider = new ServiceProviderModel({
        serviceType: serviceProvider
      });
      newServiceProvider.save(function (err, res){
        callback(err, res);
      });
    }
  });
}
function AddRule(words_id, serviceProvider_id, matchPerce, callback) {
  RulesModel.findOne({ keyword_id: words_id.toString(), serviceProvider_id: serviceProvider_id.toString()}).exec(function (err, ruleRes) {
    if (ruleRes){
      ruleRes.matchPerce = matchPerce;
      ruleRes.save(function (err, res){
        callback(err, res);
      });
    } else {
      var newRule = new RulesModel({
        keyword_id: words_id,
        serviceProvider_id: serviceProvider_id,
        matchPerce: matchPerce
      });
      newRule.save(function (err, res){
        callback(err, res);
      });
    }
  });
}

function AddRulesTest(rul) {
  AddKeywords(rul.word, function (err, keywordsRes) {
    if (err){
      return;
    }
    AddServiceProvider(rul.serviceProvider, function (err, serviceProviderRes) {
      if (err){
        return;
      }
      AddRule(keywordsRes._id, serviceProviderRes._id, rul.matchPerce, function (err, serviceProviderRes) {
        if (err){
          return;
        }
      });
    });
  });
}
function RunTest() {
  for(var ind in rules){
    AddRulesTest(rules[ind]);
  }
}

function action(assets_list, callback) {
  var msgList = [];
  for (var ind in assets_list){
    var msg = assets_list[ind].msg;
    msgList.push(msg);
  }

  if (msgList.length > 1){
    msgList = msgList.join(' ');
  }

  KeywordsModel.find(function (err, wordList) {
    if (wordList && wordList.length == 0){
      RunTest();
    } else if (wordList){

      var wordsIncludes_id = [];
      for(var ind in wordList){
        if (msgList.includes(wordList[ind].word)){
          wordsIncludes_id.push(wordList[ind]._id.toString())
        }
      }

      RulesModel.find({ 'keyword_id': { '$in': wordsIncludes_id } }, function (err, rulesRes) {
        if (rulesRes){
          var res = [];
          for(var ind in rulesRes){
            res.push(rulesRes[ind]._id);
          }
          //var t = rulesRes.toArray();
          callback(err, res);
        }
      })
    }
  });
}
exports.analysisAction = function (user_id, callback) {
  var o_id = new mongo.ObjectID(user_id);
  UserData.findById(o_id)
    .populate('Assets_id_list')
    .exec(function (err, userResult) {
      if (err) callback(err);

      action(userResult.Assets_id_list, function(err, rulesRes_id){
        if (err) {
          callback(err);//return res.json({success: false, msg: 'Failed information analysis.'});
        }

        userResult.rules_id_list = rulesRes_id;
        userResult.timeAnalysis = Date.now();
        userResult.save(function (err, data) {
          callback('Successful information analysis.');
        });
      });
    });
};

/*
exports.Action = function (assets_list, callback) {

  //RunTest();

  var msgList = [];
  for (var ind in assets_list){
    var msg = assets_list[ind].msg;
    msgList.push(msg);
  }

  if (msgList.length > 1){
    msgList = msgList.join(' ');
  }

  KeywordsModel.find(function (err, wordList) {
    if (wordList){
      var wordsIncludes_id = [];
      for(var ind in wordList){
        if (msgList.includes(wordList[ind].word)){
          wordsIncludes_id.push(wordList[ind]._id.toString())
        }
      }

      RulesModel.find({ 'keyword_id': { '$in': wordsIncludes_id } }, function (err, rulesRes) {
        if (rulesRes){
          var res = [];
          for(var ind in rulesRes){
            res.push(rulesRes[ind]._id);
          }
          //var t = rulesRes.toArray();
          callback(err, res);
        }
      })
    }
  });



};
*/
