const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservasControllers');

router.get('/rentals', reservaController.getReservas);
router.get('/rentals/:id', reservaController.getReservaById);
router.post('/rentals', reservaController.createReserva);
router.put('/rentals/:id', reservaController.updateReserva);
router.delete('/rentals/:id', reservaController.deleteReserva)

module.exports = router