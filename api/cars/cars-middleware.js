const Cars = require('./cars-model');
const vin = require('vin-validator');

const checkCarId = async (req, res, next) => {
  const { id } = req.params;
  const car = await Cars.getById(req.params.id);
  if(!car) {
    res.status(404).json({ message: `car with id ${req.params.id} is not found`});
    return;
  }
  req.car = car;
  next();
}

const checkCarPayload = (req, res, next) => {
  const { make, model, mileage, vin } = req.body;
  if(!make) {
    res.status(400).json({ message: 'make is missing'});
    return;
  }
  if(!model) {
    res.status(400).json({ message: 'model is missing'});
    return;
  }
  if(!mileage) {
    res.status(400).json({ message: 'mileage is missing'});
    return;
  }
  if(!vin) {
    res.status(400).json({ message: 'vin is missing'});
    return;
  }
  next();
}

const checkVinNumberValid = (req, res, next) => {
  if (vin.validate(req.body.vin)) {
    next()
  } else {
    next({ 
      status: 400, 
      message: `vin ${req.body.vin} is invalid`})
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  const { vin } = req.body;
  const allCars = await Cars.getAll();
  const duplicateVin = allCars.filter((car) => car.vin === vin);
  if(duplicateVin.length > 0) {
    res.status(400).json({ message: `vin ${req.body.vin} already exists`});
    return;
  }
  next();
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}
