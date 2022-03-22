const Cars = require('./cars-model');
const router = require('express').Router();
const {
    checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique
} = require('./cars-middleware');

router.get('/', async (req, res, next) => {
    try {
        const data = await Cars.getAll();
        res.status(200).json(data);
    } catch(err) {
        res.status(500).json({ message: 'error getting car' });
    }
})

router.get('/:id', checkCarId, async (req, res) => {
    try {
        res.json(req.car)
      } catch (err) {
        next(err)
      }
    })

router.post('/', checkCarPayload, checkVinNumberValid, checkVinNumberUnique, async (req, res, next) => {
    try {
        const postedCar = await Cars.create(req.body);
        res.status(201).json(postedCar);
    } catch(err) {
        res.status(500).json({ message: 'error adding car' });
    }
})

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        customError: 'Something went wrong',
        message: err.message,
        stack: err.stack
    })
})

module.exports = router;
