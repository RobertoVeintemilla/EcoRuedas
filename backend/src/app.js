const express = require('express');
const app = express();
const usersRoutes = require('./routes/usersRoutes');
const reservasRoutes = require('./routes/reservasRoutes');
const vehiclesRoutes = require('./routes/vehiculosRoutes');

app.use(express.json())

app.use('/api', usersRoutes);
app.use('/api', vehiclesRoutes);
app.use('/api', reservasRoutes)

module.exports = app;