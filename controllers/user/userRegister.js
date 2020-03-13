const User = require('../../database/models/user')

module.exports = (req, res) => {
    User.create(
        
        req.body, (error,user) => {
            console.log(error);
            
            
        if (error) {
           return res.redirect('/user/create')
        }
        res.redirect('/user/login')
    })    
};