const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersControllers');
const validateRegister = require('../middlewares/validarDatos')
const authMiddleware = require('../middlewares/auth')

router.get('/users', authMiddleware.verificarToken, usersController.getUsers);
router.get('/users/:id', usersController.getUserById);
router.post('/login', usersController.loginUser);
router.post('/register', validateRegister.validarRegistro, usersController.createUser);
router.put('/users/:id', usersController.updateUser, authMiddleware.verificarToken);
router.delete('/users/:id', usersController.deleteUser, authMiddleware.verificarToken)

module.exports = router;