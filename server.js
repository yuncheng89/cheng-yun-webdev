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
// Connect to database

var mongoose = require('mongoose');

var connectionString = 'mongodb://127.0.0.1:27017/wam-fall-2016';

//Check if local environment variables exist
if(process.env.MLAB_USERNAME) {

   var username = process.env.MLAB_USERNAME;
   var password = process.env.MLAB_PASSWORD;

   connectionString = 'mongodb://'+
       username +':'+
       password +
       '@ds049446.mlab.com:49446/cs5610';
}

console.log(connectionString);

mongoose.connect(connectionString);

/*******************************************************/

//require ("./test/app.js")(app);

require("./assignment/app.js")(app);
require("./project/app.js")(app);

//require("./lecture/todo/app.js")(app);

app.get('/env', function(req,res){
   res.json(process.env);
});

var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port      = process.env.PORT || 3000;

console.log(ipaddress);
console.log(port);

app.listen(port, ipaddress);

