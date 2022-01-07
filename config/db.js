const mongoose = require('mongoose')
const User = require('../schemas/User')

const initializationDb = async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/hlj')

    mongoose.connection.db.collection('users').countDocuments(async (err, count) => {
        if (count === 0) {
            await User.create({
                name: 'Admin',
                email: 'admin@example.com'
            })
        }
    });
}

module.exports = initializationDb