/*******************************************************/
// Express

var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
//app.use(bodyParser.json({type: 'website/json'}));
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

/*******************************************************/
// Passport session

var passport      = require('passport');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');

app.use(session({
    secret: 'this is the secret',
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

/*******************************************************/
// Centralized database object

var mongoose = require('mongoose');

var db = require('./database/database.js')(mongoose);

/*******************************************************/
// Centralized passport object

var sec = require('./security/security.js')(db, passport);

/*******************************************************/
// Pass in centralized objects: app, db, sec

//require ("./test/app.js")(app);
//require("./lecture/todo/app.js")(app);
require("./assignment/app")(app, db, sec);
require("./project/app")(app, db, sec);

//
/*******************************************************/

app.get('/env', function(req,res){
   res.json(process.env);
});

var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port      = process.env.PORT || 3000;

console.log(ipaddress);
console.log(port);

app.listen(port, ipaddress);

