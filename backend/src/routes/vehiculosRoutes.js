const express = require('express');
const router = express.Router();
const vehiclesController = require('../controllers/vehiculosControllers.js');

router.get('/vehicles', vehiclesController.getVehicles);
router.get('/vehicles/:id', vehiclesController.getVehiclesById);
router.post('/vehicles/', vehiclesController.createVechicle);
router.put('/vehicles/:id', vehiclesController.updateVehicle);
router.delete('/vehicles/:id', vehiclesController.deleteVehicle)

module.exports = router