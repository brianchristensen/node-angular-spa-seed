var ChannelModel  = require('../models/channelModel');

module.exports = function(app) {
    var cm = new ChannelModel();
    
    // get all channels
    app.get('/api/channels', function(req, res) {
	
	    res.json(cm.getChannels());
    });

    // create new channel and return all channels after creation
    app.post('/api/channels', function(req, res) {

	    cm.addChannel(req.body.text);
	    res.json(cm.getChannels());
    });
}
