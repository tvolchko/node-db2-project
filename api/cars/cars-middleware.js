let Cars = require('./cars-model')
var vinValidator = require('vin-validator');

async function checkCarId(req, res, next) {
  let result = await Cars.getById(req.params.id)
  if(result) {
    req.car = result
    next()
  } else {
    res.status(404).json({ message: `car with id ${req.params.id} is not found` })
  }
}

const checkCarPayload = (req, res, next) => {
    if(!req.body.vin) {
      res.status(400).json({ message: `vin is missing` })
    }
    if(!req.body.make) {
      res.status(400).json({ message: `make is missing` })
    }
    if(!req.body.model) {
      res.status(400).json({ message: `model is missing` })
    }
    if(!req.body.mileage) {
      res.status(400).json({ message: `mileage is missing` })
    }
    next()
}

const checkVinNumberValid = (req, res, next) => {
  if(vinValidator.validate(req.body.vin)) {
    next()
  } else {
    res.status(400).json({ message: `vin ${req.body.vin} is invalid` })
  }
  
}

async function checkVinNumberUnique(req, res, next) {
  Cars.getAll()
    .then(cars => {
      console.log(cars)
      const filtered = cars.filter(car => car.vin === req.body.vin)
      console.log(filtered)
      if(filtered.length){
        res.status(400).json({ message: `vin ${req.body.vin} already exists` })
      } else {
        next()
      }
    })
    .catch(next)
  // let cars = await Cars.getAll()
  // let filtered = cars.filter(car => {car.vin === req.body.vin})
  // if(filtered.length() > 0) {
  //   res.status(400).json({ message: `vin ${req.body.vin} already exists` })
  // } else {
  //   next()
  // }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}