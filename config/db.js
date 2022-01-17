import bcrypt from "bcrypt";
import mongoose from "mongoose";
import User from "../models/User.js"

const initializationDb = async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/hlj')

    const encryptedPassword = await bcrypt.hash(process.env.DEFAULT_PASSWORD, 10)

    mongoose.connection.db.collection('users').countDocuments(async (err, count) => {
        if (count === 0) {
            await User.create({
                name: 'Admin',
                email: 'admin@example.com',
                password: encryptedPassword
            })
        }
    });
}

export default initializationDb