const User = require('../database/models/user')

module.exports = (req, res, next) => {
    // connection a la base de données
    User.findById(req.session.userId, (error, user) => {
        if (error || !user) {
           return res.redirect('/')
        }
        next()
    })
    // verification user
}