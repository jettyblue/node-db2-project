// Server
const express = require("express");
const server = express();
server.use(express.json());

// Router
const carsRouter = require('./cars/cars-router');
server.use('/api/cars/', carsRouter);

// Export
module.exports = server;
