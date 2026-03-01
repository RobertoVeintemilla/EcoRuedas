const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../../data/reservas.json');
const dataPathVehiculos = path.join(__dirname, '../../data/vehiculos.json');

leerDatosVehiculos = () => {
    const jsonData = fs.readFileSync(dataPathVehiculos);
    return JSON.parse(jsonData)
}

const leerDatos = () => {
    const jsonData = fs.readFileSync(dataPath);
    return JSON.parse(jsonData)
}

const escribirDatos = (data) => {
    fs. writeFileSync(dataPath, JSON.stringify(data, null, 2))   
}

const escribirDatosVehiculos = (data) => {
    fs.writeFileSync(dataPathVehiculos, JSON.stringify(data, null, 2))
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
    const datosVehiculos = leerDatosVehiculos();

    const { id_usuario, id_vehiculo, hora_reserva, hora_devolucion, estado, seguro } = req.body;
    const total_final = datosVehiculos.precio_por_hora
    if (seguro) {
        total_final = total_final * ((new Date(`1970-01-01T${hora_devolucion}:00Z`) - new Date(`1970-01-01T${hora_reserva}:00Z`)) / (1000 * 60 * 60)) + 20; // Ejemplo de cálculo con seguro
        return total_final ? res.json({ mensaje: "Reserva creada con seguro", total: total_final }) : res.status(400).json({ error: "Error al calcular el total con seguro" });
    }
    const newReserva = {
        id: datos.length + 1,
        id_usuario,
        id_vehiculo,
        fecha_reserva: new Date().toISOString().slice(0, 10),
        hora_reserva,
        hora_devolucion,
        total_final: total_final || 0,
        estado,
        seguro
    };

    if (estado === "cancelado" || estado === "terminado") {
        const vehiculoIndex = datosVehiculos.findIndex(v => v.id === id_vehiculo);
        if (vehiculoIndex !== -1) {
            datosVehiculos[vehiculoIndex].disponibilidad = true;
            escribirDatosVehiculos(datosVehiculos);
        }
    } else {
        const vehiculoIndex = datosVehiculos.findIndex(v => v.id === id_vehiculo);
        if (vehiculoIndex !== -1) {
            datosVehiculos[vehiculoIndex].disponibilidad = false;
            escribirDatosVehiculos(datosVehiculos);
        }
    }

    datos.push(newReserva);
    escribirDatos(datos);

    res.status(201).json({
        mensaje: "Reservada creada con éxito", reserva: {
            id: newReserva.id,
            id_usuario: newReserva.id_usuario,
            id_vehiculo: newReserva.id_vehiculo,
            fecha_reserva: newReserva.fecha_reserva,
            hora_reserva: newReserva.hora_reserva,
            estado: newReserva.estado,
            total_final: newReserva.total_final,
            seguro: newReserva.seguro
        }
    })
}

const updateReserva = (req, res) => {
    const datos = leerDatos();
    const id = parseInt(req.params.id);
    const { id_usuario, id_vehiculo, hora_reserva, hora_devolucion, estado, seguro} = req.body;
    const indice = datos.findIndex(u => u.id === id);
    if (seguro) {
        const total_final = datosVehiculos.precio_por_hora * ((new Date(`1970-01-01T${hora_devolucion}:00Z`) - new Date(`1970-01-01T${hora_reserva}:00Z`)) / (1000 * 60 * 60)) + 20; // Ejemplo de cálculo con seguro
        res.json({ mensaje: "Reserva creada con seguro", total: total_final })
    }

    if (indice === -1) {
        return res.status(401).json({ error : "Reserva no encontrada"})
    }

    datos[indice] = {
        ...datos[indice],
        id_usuario: id_usuario || datos[indice].id_usuario,
        id_vehiculo: id_vehiculo || datos[indice].id_vehiculo,
        hora_reserva: hora_reserva || datos[indice].hora_reserva,
        hora_devolucion: hora_devolucion || datos[indice].hora_devolucion,
        estado: estado || datos[indice].estado,
        total_final: total_final || datos[indice].total_final,
        seguro: seguro || datos[indice].seguro
    }
    escribirDatos(datos);
    res.json({ mensaje: "Reserva actualizada", reserva: datos[indice]})

    if (estado === "cancelado" || estado === "terminado") {
        const vehiculoIndex = datosVehiculos.findIndex(v => v.id === id_vehiculo);
        if (vehiculoIndex !== -1) {
            datosVehiculos[vehiculoIndex].disponibilidad = true;
            escribirDatosVehiculos(datosVehiculos);
        }
    } else {
        const vehiculoIndex = datosVehiculos.findIndex(v => v.id === id_vehiculo);
        if (vehiculoIndex !== -1) {
            datosVehiculos[vehiculoIndex].disponibilidad = false;
            escribirDatosVehiculos(datosVehiculos);
        }
    }
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