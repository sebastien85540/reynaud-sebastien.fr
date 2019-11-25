const bcrypt = require('bcrypt')
    , User = require('../../database/models/user');

module.exports = (req,res) => {
    const { email, password } = req.body;
    
    User.findOne({ email }, (error, user) => {
        // console.log(req.body);
      console.log(error);
        
        if (user) {
            bcrypt.compare(password, user.password, (error, same) => {
                if (same) {
                    
                    req.session.userId = user._id
                    res.redirect('/profil')
                }
                else{
                    res.redirect('/user/login')
                }
            })
        }
         else {
           return res.redirect('/user/login')
        }
    })
} 