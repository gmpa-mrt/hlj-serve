const mongoose = require('mongoose')
const  normalize  = require("../lib/normalizeJson");

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
})

normalize(userSchema)

module.exports = mongoose.model('User', userSchema)