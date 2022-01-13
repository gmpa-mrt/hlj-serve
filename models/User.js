import mongoose from "mongoose";
import {normalize} from "../lib/normalizeJson.js";
import checkValidEmail from "../middlewares/email.js";

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        validate: [checkValidEmail, "Please fill a valid email address"]
    },
    token:String
})

normalize(userSchema)

export default mongoose.model('User', userSchema)
