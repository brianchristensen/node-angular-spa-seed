// Jasmine tests for ChannelModel

var ChannelModel = require('../models/channelModel');

describe('Channel Model', function () {
    var cm = new ChannelModel();
    
    it('should add a new channel called TestChannel because it does not already exist', function () {
        var res = cm.addChannel('TestChannel');
        expect(res).toBe(true)
    });
    
    it('should fail to add a new channel called TestChannel because we have previously added it', function () {
        var res = cm.addChannel('TestChannel');
        expect(res).toBe(false)
    });
    
    it('should have a channel list of length 1 because we have previously added "TestChannel"', function () {
        var channels = cm.getChannels();
        expect(channels.length).toBe(1)
    });
    
    it('should have a channel called "TestChannel" because we have previously added it', function () {
        var res = cm.channelExists('TestChannel');
        expect(res).toBe(true)
    });
});
