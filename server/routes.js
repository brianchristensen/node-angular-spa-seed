module.exports = function (app, jwt, secret) {
    // api controller routes (secure)
    require('./controllers/loginController')(app, jwt, secret);
    require('./controllers/channelController')(app); // channel controller

    // default application routes (non-secure)
    app.get('*', function(req, res) {
        res.sendfile('./public/app/views/layout.html'); // load the app default layout
    });
}
