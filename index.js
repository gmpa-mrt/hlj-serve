const express = require('express')

const app =  express()

app.get('/', (req, res) => {
    res.status(200).json({message: 'Hello World !'})
})


const PORT = 4000
app.listen(PORT, () => console.log(`Server started on ${PORT}`))