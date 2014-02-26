module.exports = function(tollsum) {
    var ChannelModel = require('../models/channelModel');
    var cm = new ChannelModel(tollsum.db);
    
    // get all channels
    tollsum.app.get('/api/channels', function(req, res) {
        if (!(req.user.role === 'admin')) { res.send(401, 'Must be an admin to view all channels.'); }
        else {
	        res.json(cm.getChannels());
	    }
    });

    // create new channel and return all channels after creation
    tollsum.app.post('/api/channels', function(req, res) {
        
        req.assert('text', 'Channel name is required.').notEmpty();

        var errors = req.validationErrors();
        
        if (errors) { res.send(400, errors); }
        else {
	        cm.addChannel(req.body.text);
	        res.json(cm.getChannels());
	    }
    });
}
