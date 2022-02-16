const express = require("express")

const server = express()

const carsRouter = require('./cars/cars-router')

server.use(express.json());

server.use('/api/cars', carsRouter)

server.use((error, req, res, next) => {
    console.log(error.status)
    res.status(error.status || 500).json({
      message: 'Catastrophic error!',
      originalMessage: error.message,
    })
  })

module.exports = server
