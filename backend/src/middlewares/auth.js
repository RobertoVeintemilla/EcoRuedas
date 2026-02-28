const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET_KEY

const verificarToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ error: "Acceso denegado, falta token"});

    try {
        //Quitamos la palabra "Beaer" si viene en el header
        const decoded = jwt.verify(token.split(" ")[1],SECRET_KEY);
        req.user = decoded; //Guardamos los datos del usuario en la petición
        next();
    } catch (error){
        res.status(401).json({ error: "Token no válido o expirado"})
    }
}

module.exports = {
    verificarToken
}