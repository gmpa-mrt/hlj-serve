require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const initializationDb = require("./config/db");
const User = require("./schemas/User")


const app = express()

// test creation user
async function createUser() {
    await User.create({
        name: 'test',
        email: 'test@example.com',
    })
}

initializationDb()
    .then(r => console.log('Database initialized'))
    .catch(err => console.log(err.message))


// route test
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello World !' })
})

app.get('/users', async (req, res) => {
    const users = await User.find({})
    return res.status(200).json({ users })
})


// createUser().then(r => console.log('User created')).catch(e => console.log(e.message))

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server started on ${PORT}`))