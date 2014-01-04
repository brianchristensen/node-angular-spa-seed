module.exports = function (app) {
    // controller routes     
    require('./controllers/channelController')(app); // channel controller

    // default application route
    app.get('*', function(req, res) {
	    res.sendfile('./public/app/views/layout.html'); // load the app default layout
    });
}
