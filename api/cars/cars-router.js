const Cars = require('./cars-model')
const router = require('express').Router()
const { checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique } = require('./cars-middleware')

router.get('/', (req, res, next) => {
    Cars.getAll()
        .then(cars => {
            res.status(200).json(cars)
        })
        .catch(next)
})

router.get('/:id', checkCarId, (req, res, next) => {
    res.status(200).json(req.car)
})

router.post('/', checkCarPayload, checkVinNumberUnique, (req, res, next) => {
    Cars.create(req.body)
        .then(newCar => {
            res.status(201).json(newCar)
        })
        .catch(next)
})

module.exports = router
