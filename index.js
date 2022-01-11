import dotenv from 'dotenv'
import express from "express"
import bodyParser from "body-parser";
import initializationDb from './config/db.js'
import user_route from './routes/user.route.js'
import api_route from './routes/api.route.js'

dotenv.config()

const app = express()

app.use(bodyParser.json());

initializationDb()
    .then(r => console.log('Database initialized'))
    .catch(err => console.log(err.message))

// route test
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello World !' })
})

//@Todo default 404
// routes
app.use('/', user_route)
app.use('/api', api_route)

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server started on ${PORT}`))