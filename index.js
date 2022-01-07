require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const initializationDb = require("./config/db");


const app =  express()

initializationDb()
    .then(r => console.log('Database initialized'))
    .catch(err => console.log(err.message))


// route test
app.get('/', (req, res) => {
    res.status(200).json({message: 'Hello World !'})
})


const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server started on ${PORT}`))