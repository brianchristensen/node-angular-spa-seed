// dependencies
var express     = require('express');
var expressJWT  = require('express-jwt');
var jwt         = require('jsonwebtoken');
var secret      = 'testSecret';
var validator   = require('express-validator');

var app         = express();
var db          = require('./server/data/database').connection;

// DB usage examples ////////////////////////////////////////

/*db.NJ_TurnPike.find(function(err, docs) {
    if (err) console.log(err);
    else {
        console.log(docs);
    }    
});*///this one returns a LOT of documents ;)

var User = require('./server/models/userModel');
var myUser = new User(db);

myUser.getAllUsers();

// end DB usage examples ////////////////////////////////////

// server config
app.configure(function() {
    app.use(express.static(__dirname + '/public'));	// set the static files location i.e. /public/img will be /img for users
    app.use(express.logger('dev')); 	// log every request to the console
    app.use(express.json());            // pull information from html in POST
    app.use(express.urlencoded());
    app.use(validator());                 // provides validation methods on req object   		
    app.use(express.methodOverride()); 	// simulate DELETE and PUT
    app.use('/api', expressJWT({ secret: secret })); // secure api routes with JWT
});

// create tollsum data structure to hold services
// possibly replace with IOC framework in the future (beat)
var tollsum = {
    app: app,
    jwt: jwt,
    secret: secret,
    db: db
}

// server routes
require('./server/routes')(tollsum);

// start server
var port = 8081;

app.listen(port);
console.log("App listening on port " + port.toString());

