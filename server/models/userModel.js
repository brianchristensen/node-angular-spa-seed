// user model constructor
module.exports = function UserModel(db) {
    var self = this;
    
    // private
    

    // public
    self.getAllUsers = function getAllUsers () {
        db.Users.find(function(err, docs) {
            if (err) console.log(err);
            else {
                console.log(docs);
            }    
        });
    };
}
