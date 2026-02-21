const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../../data/reservas.json');

const leerDatos = () => {
    const jsonData = fs.readFileSync(dataPath);
    return JSON.parse(jsonData)
}

const escribirDatos = (data) => {
    fs. writeFileSync(dataPath, JSON.stringify(data, null, 2))   
}

//Controladores
const getReservas = (req, res) => {
    res.json(leerDatos())
}

const getReservaById = (req, res) => {
    const id = parseInt(req.params.id);
    const reserva = leerDatos().find(ui => ui.id === id);
    res.json(reserva)
}

const createReserva = (req, res) => {
    const datos = leerDatos();
    const { id_usuario, id_vehiculo, hora_reserva, hora_devolucion, estado } = req.body;
    const newReserva = {
        id: datos.length + 1,
        id_usuario,
        id_vehiculo,
        fecha_reserva: new Date().toISOString().slice(0, 10),
        hora_reserva,
        hora_devolucion,
        estado
    };
    datos.push(newReserva);
    escribirDatos(datos);

    res.status(201).json({
        mensaje: "Reservada creada con éxito", reserva: {
            id: newReserva.id,
            id_usuario: newReserva.id_usuario,
            id_vehiculo: newReserva.id_vehiculo,
            fecha_reserva: newReserva.fecha_reserva,
            hora_reserva: newReserva.hora_reserva,
            estado: newReserva.estado
        }
    })
}

const updateReserva = (req, res) => {
    const datos = leerDatos();
    const id = parseInt(req.params.id);
    const { id_usuario, id_vehiculo, hora_reserva, hora_devolucion, estado} = req.body;
    const indice = datos.findIndex(u => u.id === id);

    if (indice === -1) {
        return res.status(401).json({ error : "Reserva no encontrada"})
    }

    datos[indice] = {
        ...datos[indice],
        id_usuario: id_usuario || datos[indice].id_usuario,
        id_vehiculo: id_vehiculo || datos[indice].id_vehiculo,
        hora_reserva: hora_reserva || datos[indice].hora_reserva,
        hora_devolucion: hora_devolucion || datos[indice].hora_devolucion,
        estado: estado || datos[indice].estado
    }
    escribirDatos(datos);
    res.json({ mensaje: "Reserva actualizada", reserva: datos[indice]})
}

const deleteReserva = (req, res) => {
    let datos = leerDatos();
    const id = parseInt(req.params.id);

    //Verificar si existen antes de borrar
    const exist = datos.some(u => u.id === id)
    if(!exist) {
        return res.status(404).json({ error : "Reserva no encontrado"})
    }
    datos = datos.filter(u => u.id !== id);
    escribirDatos(datos);
    res.json({ mensaje: `Reserva con ID:${id} eliminado correctamente`})
};

module.exports = {
    getReservas,
    getReservaById,
    createReserva,
    updateReserva,
    deleteReserva
}