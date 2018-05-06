var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var multer = require('multer');
var xlstojson = require("xls-to-json-lc");
var xlsxtojson = require("xlsx-to-json-lc");

var morgan = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('./config/database');

mongoose.Promise = require('bluebird');
mongoose.connect(config.database, { promiseLibrary: require('bluebird') })
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

var loginApi = require('./routes/login');
var userApi = require('./routes/user.route');
var infroUserApi = require('./routes/info-user.route');
var AssetsUserApi = require('./routes/assets.route');

var app = express();

app.use(passport.initialize());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/welcomeMLZ', express.static(path.join(__dirname, 'dist')));
app.use('/assets-list', express.static(path.join(__dirname, 'dist')));
app.use('/assets-create/:id', express.static(path.join(__dirname, 'dist')));
app.use('/assets-edit/:id/:retPage', express.static(path.join(__dirname, 'dist')));
app.use('/user-edit/:id', express.static(path.join(__dirname, 'dist')));
app.use('/user-assets/:id/:retPage', express.static(path.join(__dirname, 'dist')));
app.use('/user-infro/:id', express.static(path.join(__dirname, 'dist')));
app.use('/signup', express.static(path.join(__dirname, 'dist')));
//app.use('/user-infro/:id', express.static(path.join(__dirname, 'dist')));



app.use('/users', express.static(path.join(__dirname, 'dist')));
app.use('/login', express.static(path.join(__dirname, 'dist')));
app.use('/user-create', express.static(path.join(__dirname, 'dist')));

app.use('/user', userApi);
app.use('/infroUser', infroUserApi);
app.use('/api', loginApi);
app.use('/assets', AssetsUserApi);


var storage = multer.diskStorage({ //multers disk storage settings
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    var datetimestamp = Date.now();
    cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
  }
});
var upload = multer({ //multer settings
  //storage: storage,
  fileFilter : function(req, file, callback) { //file filter
    if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length-1]) === -1) {
      return callback(new Error('Wrong extension type'));
    }
    callback(null, true);
  }
}).single('file');
/** API path that will upload the files */
app.post('/upload', function(req, res) {
  var exceltojson;
  upload(req,res,function(err){
    if(err){
      res.json({error_code:1,err_desc:err});
      return;
    }
    /** Multer gives us file info in req.file object */
    if(!req.file){
      res.json({error_code:1,err_desc:"No file passed"});
      return;
    }
    /** Check the extension of the incoming file and
     *  use the appropriate module
     */
    if(req.file.originalname.split('.')[req.file.originalname.split('.').length-1] === 'xlsx'){
      exceltojson = xlsxtojson;
    } else {
      exceltojson = xlstojson;
    }
    try {
      exceltojson({
        input: req.file.path,
        output: null, //since we don't need output.json
        lowerCaseHeaders:true
      }, function(err,result){
        if(err) {
          return res.json({error_code:1,err_desc:err, data: null});
        }
        res.json({error_code:0,err_desc:null, data: result});
      });
    } catch (e){
      res.json({error_code:1,err_desc:"Corupted excel file"});
    }
  })
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.json({
    message: err.message,
    error: err
  });
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});


module.exports = app;
