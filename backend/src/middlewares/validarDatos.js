const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '../../data/users.json');

const leerDatos = () => {
    const jsonData = fs.readFileSync(dataPath);
    return JSON.parse(jsonData);
}

const validarRegistro = (req, res, next) => {
    const { name, email, password } = req.body;
    const datos = leerDatos();
    
    // Validamos que el email no esté registrado
    const emailExistente = datos.users.find(user => user.email === email);
    if (emailExistente) {
        return res.status(400).json({ error: "El email ya está registrado" });
    }

    if (!name || !email || !password) {
        return res.status(400).json({ error: "Nombre, email y contraseña son obligatorios" });
    }

    if (password.length < 6) {
        return res.status(400).json({ error: "La contraseña debe tener al menos 6 caracteres" });
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
        return res.status(400).json({ error: "El email no es válido" });
    }

    if (name.length < 5) {
        return res.status(400).json({ error: "El nombre debe tener al menos 5 caracteres" });
    }

    if (/^[a-zA-Z0-9]+$/.test(password)) {
        return res.status(400).json({ error: "La contraseña debe contener al menos un carácter especial" });
    }
    next();
}

module.exports = { validarRegistro }