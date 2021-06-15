require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()

app.use(cors());

const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}

mongoose.connect( process.env.DB_URI, connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

app.use('/api',require('./routes/api'))

app.use('/community',require('./routes/community'))

app.use(express.static('application-interface/build'))

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log('server Running port:'+PORT)
})