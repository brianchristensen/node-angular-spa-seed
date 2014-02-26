// tollsum database configuration
var mongojs = require('mongojs');
var config = require('../config');

var dbUser = "testUser";
var dbPass = "testPass";

var dbDevServer = "test";
var dbStagingServer = "";
var dbProdServer = "";
var currentServer = "";

// change database based on environment setting in server/config.js
switch(config.environment) {
    case "dev":
        currentServer = dbDevServer;
        break;
    case "staging":
        currentServer = dbStagingServer;
        break;
    case "prod":
        currentServer = dbProdServer;
        break;
}

var CONNECTION_STRING = currentServer;

var COLLECTIONS = [    
    'Users'
]


exports.connection = mongojs(CONNECTION_STRING, COLLECTIONS);
