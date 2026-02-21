const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservasControllers');

router.get('/reservas', reservaController.getReservas);
router.get('/reservas/:id', reservaController.getReservaById);
router.post('/reservas', reservaController.createReserva);
router.put('/reservas/:id', reservaController.updateReserva);
router.delete('/reservas/:id', reservaController.deleteReserva)

module.exports = router