const mongoose = require('mongoose')

// @TODO id for update controller 

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
})

module.exports = mongoose.model('User', userSchema)