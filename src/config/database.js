"use strict"

const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()
const url = "mongodb+srv://zenthic:jagadraya@cluster0.tig0lki.mongodb.net/?retryWrites=true&w=majority"
const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	dbName: "mws"
}

mongoose.connect(url, options)
const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
	console.log('Database has been successfully connected')
})