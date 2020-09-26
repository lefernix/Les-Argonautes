const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

const uri = process.env.ATLAS_URI
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})

const connection = mongoose.connection
connection.once('open', () => {
    console.log('MongoDB connection etablished successfully !')
})

const crewRouter = require('./routes/crew')

app.use('/api/v1/crew', crewRouter)

app.listen(port, () => {
    console.log(`🚀 Le serveur est lancé sur le port : ${port} !`)
})