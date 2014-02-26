var _ = require('underscore')._;

module.exports = function(db) {
    var self = this,
        channels = [];

    self.addChannel = function (channelName) {
	    if (!_.contains(channels, channelName)) {
		    channels.push(channelName);
		    return true;
	    }
	    else {
	        return false;
	    }
    }

    self.getChannels = function () {
	    return channels;
    }
    
    self.channelExists = function (channelName) {
        if (_.contains(channels, channelName)) {
            return true;
        }
        else {
            return false;
        }
    }
}
