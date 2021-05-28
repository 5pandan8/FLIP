const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const db = require("./db")

const app = express()

app.use(bodyParser.json())

app.use('/api/flip', require('./routes/api/flip'))

app.use('/api/upload', require('./routes/api/upload'))

const PORT = process.env.PORT || 5000

db.connect((err) => {
    if(err){
        console.log(err)
        console.log('unable to connect to database')
        process.exit(1)
    }
    else{
        app.listen(PORT, () => console.log(`connected to database, Server started on Port ${PORT}`))
    }
});

app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/index.html')
})

