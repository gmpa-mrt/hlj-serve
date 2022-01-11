import mongoose from "mongoose";
import {normalize} from "../lib/normalizeJson.js";

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

export default mongoose.model('User', userSchema)

