"use strict"

const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')

const apiRoutes = require('./src/routes/api')

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
   extended: true
}))

app.use(cors({
   origin: "*",
   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
   allowedHeaders: "Content-Type, Authorization, X-Requested-With, Accept"
}))

app.use("/", (req, res) => {
   res.send("Aplikasi Rest API")
})

// apiRoutes
app.use("/api/", apiRoutes)

app.listen(port, () => {
   console.log(`Listening at http://localhost:${port}`)
})