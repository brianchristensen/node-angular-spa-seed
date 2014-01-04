// dependencies
var express  = require('express');
var app      = express();

// config
app.configure(function() {
    app.use(express.static(__dirname + '/public'));	// set the static files location i.e. /public/img will be /img for users
    app.use(express.logger('dev')); 	// log every request to the console
    app.use(express.bodyParser()); 		// pull information from html in POST
    app.use(express.methodOverride()); 	// simulate DELETE and PUT
});

// routes
require('./server/routes')(app);

// start server
app.listen(8081);
console.log("App listening on port 8081");

