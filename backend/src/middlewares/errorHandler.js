const errorHandler = (err, req, res, next) => {
    console.error(err.stack); //Para verlo en la consola
    const statusCode = err.statusCode || 500;
    const mensaje = err.message || "Error Interno del Servidor";
    res.status(statusCode).json({ error: mensaje });
}

module.exports = errorHandler;