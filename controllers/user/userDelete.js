const User = require ('../../database/models/user')

module.exports = (req, res) => {
    userDelete = req.session.userId;
    User.findByIdAndDelete(userDelete, function (error) {
        console.log(req.session.userId);
        
        if (error)
        throw error;
    
    })
    res.redirect('/')
}