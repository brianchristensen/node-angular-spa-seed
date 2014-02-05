var ChannelModel  = require('../models/channelModel');

module.exports = function(app) {
    var cm = new ChannelModel();
    
    // get all channels
    app.get('/api/channels', function(req, res) {
	    console.log(req.user.role); // user information from token will always exist in req.user.*
	    res.json(cm.getChannels());
    });

    // create new channel and return all channels after creation
    app.post('/api/channels', function(req, res) {
        if (!(req.user.role === 'admin')) res.send(401, 'Must be an admin to create a channel');
	    cm.addChannel(req.body.text);
	    res.json(cm.getChannels());
    });
}
