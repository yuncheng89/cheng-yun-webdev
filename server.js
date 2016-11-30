var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
//app.use(bodyParser.json({type: 'website/json'}));
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

//require ("./test/app.js")(app);

require("./assignment/app.js")(app);
require("./lecture/todo/app.js")(app);

app.get('/env', function(req,res){
   res.json(process.env);
});

var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port      = process.env.PORT || 3000;

console.log(ipaddress);
console.log(port);

app.listen(port, ipaddress);

