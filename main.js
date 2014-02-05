// dependencies
var express     = require('express');
var expressJWT  = require('express-jwt');
var jwt         = require('jsonwebtoken');
var secret      = 'HeadFeat-Inc.-NC@o98(*@cunI2KjA-s3crE7';
var app         = express();

// app config
app.configure(function() {
    app.use(express.static(__dirname + '/public'));	// set the static files location i.e. /public/img will be /img for users
    app.use(express.logger('dev')); 	// log every request to the console
    app.use(express.json());            // pull information from html in POST
    app.use(express.urlencoded());     		
    app.use(express.methodOverride()); 	// simulate DELETE and PUT
    app.use('/api', expressJWT({ secret: secret })); // secure api routes with JWT
});

// app routes
require('./server/routes')(app, jwt, secret);

// start server
var port = 8081;

app.listen(port);
console.log("App listening on port " + port.toString());

