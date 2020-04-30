const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const fs = require('fs')
const morgan = require('morgan')
const rfs = require('rotating-file-stream')
const bitcoin = require('./providers/bitcoin.provider')
var cors = require('cors');
var multer = require('multer');
var upload = multer();
require('dotenv').config()
const server = express()
var firebase = require("firebase");
var sha256File = require('sha256-file');
/**
 * Morgan logging http access in a new file each day
 */
const logDirectory = './logs'
if (fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)) {
  const utcDate = new Date().toDateString()
  const accessLogStream = rfs(`${utcDate}.log`, {
    interval: '1d',
    path: logDirectory
  })
  server.use(morgan('combined', { stream: accessLogStream }))
}

/**
 * Try MongoDB & Bitcoin-core connection
 */

mongoose
  .connect(process.env.DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => console.log('MongoDB connected!'))
  .catch((error) => {
    console.error(`MongoDB error: ${error.message}!`)
  })



bitcoin
  .getBlockchainInfo()
  .then((response) => console.log(`Bitcoin connected to ${response} network!`))
  .catch((error) => {
    console.error(`Bitcoin error: ${error.message}!`)
  })


  // for parsing multipart/form-data
server.use(upload.array()); 
server.use(express.static('public'));

server.use(bodyParser.json())
server.use(bodyParser.raw())
server.use(bodyParser.urlencoded({ extended: true }))
server.use(cors())
require('./routes/example.route')(server)

server.listen(process.env.PORT, () => console.log(`Big brother listening on port ${process.env.PORT}!`))




  
