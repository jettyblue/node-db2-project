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
        const [user] = req.user;
        res.status(200).json(user);
    } catch(err) {
        res.status(404).json({ message: 'error getting car' });
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

module.exports = router;
