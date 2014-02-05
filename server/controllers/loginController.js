var User = require('../models/userModel');

module.exports = function (app, jwt, secret) {

    app.post('/authenticate', function(req, res) {        
        if (!(req.body.username === 'Brian' && req.body.password === 'test')) {
            res.send(403, 'Wrong user or password.'); // return 403 to differentiate login requests from api requests
            return;
        }
       
        var user = {
            first_name: 'Brian',
            last_name: 'Christensen',
            email: 'bc@gmail.com',
            role: 'user',
            id: 123
        };

        // We are sending the user information inside the token
        var token = jwt.sign(user, secret, { expiresInMinutes: 20 });

        res.json({ token: token, role: user.role });
    });
}
