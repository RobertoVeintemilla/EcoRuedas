const express = require('express');
const app = express();
const cors = require('cors');

const usersRoutes = require('./routes/usersRoutes');
const reservasRoutes = require('./routes/reservasRoutes');
const vehiclesRoutes = require('./routes/vehiculosRoutes');
const errorHandler = require('./middlewares/errorHandler');

app.use(cors());
app.use(express.json())

app.use('/api', usersRoutes);
app.use('/api', vehiclesRoutes);
app.use('/api', reservasRoutes);

app.use(errorHandler)

module.exports = app;