const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: String,
    firstName: String,
    lastName: String,
    passwordHash: String,
    country: {
        type: String,
        default: ''
    },
    about: {
        type: String,
        default: ''},
    school: {
        type: String,
        default: ''},
    profilePicture: {
        type: Buffer,
        default: ''}
})

userSchema.statics.format = (user) => {
    return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        about: user.about,
        school: user.school,
        profilePicture: user.profilePicture
    }
}

const User = mongoose.model('User', userSchema);

module.exports = User