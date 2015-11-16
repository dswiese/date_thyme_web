var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var methodOverride = require('method-override');
//var config = require('./private/config.json');

var port = process.env.PORT || config.port || 8080;

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json({ limit: '50mb' })); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users


// routes ==================================================
require('./app/routes')(app); // configure our routes

// start app ===============================================

app.listen(port);										// startup our app at http://localhost:8080
console.log('Magic happens on port ' + port); 			// shoutout to the user
exports = module.exports = app; 
