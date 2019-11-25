const mongoose = require('mongoose')
    , bcrypt = require('bcrypt')
const UserSchema = new mongoose.Schema({
    lastname : {
        type: String,
        required: [true,'le nom est obligatoire']
    },
    firstname: {
        type: String,
        required: [true, 'le prenom est obligatoire']
    } ,
    email    : {
        type: String,
        required: [true,'l\'email est obligatoire'],
        unique: true},
    password : {
        type: String,
        required: [true, 'le mot de passe est obligatoire']
    }
})

UserSchema.pre('save', function (next) {
    const user = this
    bcrypt.hash(user.password, 10, (error, encrypted) => {
        user.password = encrypted
        next()
    })
})
module.exports = mongoose.model('User', UserSchema)