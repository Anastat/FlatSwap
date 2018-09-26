const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, //primary key
    firstName: String,
    lastName: String,
    passwordHash: String,
    about: String,
    email: String,
    school: String,
    profilePicture: Buffer,

})

userSchema.statics.format = (user) => {
    return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        about: user.about,
        school: user.school,
    }
}

const User = mongoose.model('User', userSchema);

module.exports = User