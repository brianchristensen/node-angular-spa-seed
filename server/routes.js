module.exports = function (tollsum) {
    // api controller routes (secure)
    require('./controllers/loginController')(tollsum);
    require('./controllers/channelController')(tollsum); // channel controller

    // default application routes (non-secure)
    tollsum.app.get('*', function(req, res) {
        res.sendfile('./public/app/views/layout.html'); // load the app default layout
    });
}
