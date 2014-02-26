module.exports = function (tollsum) {
    var User = require('../models/userModel');
    
    tollsum.app.post('/authenticate', function(req, res) {        
        if (!(req.body.username === 'Brian' && req.body.password === 'test')) {
            res.send(403, 'Wrong user or password.'); // return 403 to differentiate login requests from api requests
            return;
        }
       
        var user = {
            first_name: 'Brian',
            last_name: 'Christensen',
            email: 'bc@gmail.com',
            role: 'user'
        };

        // We are sending the user information inside the token
        var token = tollsum.jwt.sign(user, tollsum.secret, { expiresInMinutes: 20 });

        res.json({ token: token, role: user.role });
    });
}
