const User = require('../../database/models/user'),
    bcrypt = require('bcrypt');

module.exports = (req, res) => {
    // const user = User.findById(req.session.userId);
    // if (user) {
        console.log(req.params.password);
        
        // const passwordUpdate = User.findById(req.session.password)
        if (req.body.pass === req.body.pass2) {
            bcrypt.hash(req.body.pass, 10, (error, hash) => {
                if (error) {
                    
                    console.log(error);
                }
                req.body.pass = hash
                User.findOneAndUpdate(req.params.userId, {'password' : req.body.pass}, function (error, updatePassword) {
                    if (error) {
                        console.log(error);
                        res.redirect('/user/password/edit')
                    }
                    res.redirect('/user/login')
                })

            }
            )
        // }
    }
    // res.redirect('/user/create')
}