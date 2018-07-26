var express = require('express');
var path=require('path');
var session = require('express-session');
var flash = require('express-flash');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var mongoose = require('mongoose');
var http=require('http');

var fs=require('fs');


// Controllers
var userController = require('./controllers/user');

//created express app
var app = express();

//created both http 
var httpServer = http.createServer(app);


httpServer.listen(3000);
mongoose.connect('mongodb://127.0.0.1:27017/Demo');

mongoose.connection.on('error', function(err) {
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.'+err);
  process.exit(1);
});


/*Essential express settings */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('port',  3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));



app.use(function(req, res, next) {
  //store the root folder from where the app is launched.
  req.rootPath = __dirname;
  //req.email=req.body ? (req.body.email ? req.body.email :"") : "";  
  //console.log(req.email);
  console.log("rootPath"+req.rootPath);
  res.locals.user = req.user;
  res.locals.session = req.session;
  next();
});

app.get('/',  userController.accountGet);
app.post('/',  userController.accountPut);
//uploadPhoto ajax handling
app.post('/uploadPhoto',userController.uploadPhoto);

module.exports = app;
