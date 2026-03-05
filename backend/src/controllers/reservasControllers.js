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

    const { id_usuario, id_vehiculo, hora_reserva, hora_devolucion, seguro } = req.body;
    const inicio = new Date(`${fecha_reserva}T${hora_reserva}:00`);
    const fin = new Date(`${fecha_reserva}T${hora_devolucion}:00`);
    const horas = (fin - inicio) / (1000 * 60 * 60);
    const subtotal = horas * datosVehiculos.precio_por_hora;
    const costoSeguro = seguro ? (subtotal* 0.15) : 0; // Ejemplo de costo fijo por seguro
    
    const total_final = subtotal + costoSeguro;

    const newReserva = {
        id: datos.length + 1,
        id_usuario,
        id_vehiculo,
        fecha_reserva: new Date().toISOString().slice(0, 10),
        hora_reserva,
        hora_devolucion,
        total_final: total_final || 0,
        estado: "en uso",
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
    let datos = leerDatos();
    let vehiculos = leerDatosVehiculos();

    const id = parseInt(req.params.id);
    const { id_usuario, id_vehiculo, hora_reserva, hora_devolucion, estado, seguro} = req.body;
    const indice = datos.findIndex(u => u.id === id);
   
    if (indice === -1) {
        return res.status(401).json({ error : "Reserva no encontrada"})
    }

    const reserva = datos[indice]
    const vehiculo = vehiculos.findIndex(v => v.id === reserva.id_vehiculo)

    const inicio = new Date(`${reserva.fecha_reserva}T${reserva.hora_reserva}:00`);
    const fin = new Date(`${reserva.fecha_reserva}T${hora_devolucion}:00`)

    const duracionHoras = (fin - inicio) / (1000 * 60 * 60)

    if (duracionHoras <= 0) {
        return res.status(400).send("La hora de devolución debe ser postrerior a la hora de inicio")
    }

    //Calculas el costo total
    const subtotal = vehiculo.precio_por_hora * duracionHoras;
    const porcentajeSeguro = reserva.seguro ? 0.15 : 0
    const total_final = subtotal + (saubtotal * porcentajeSeguro)

    //Actualizar la reserva
    datos[indice] = {
        ...reserva,
        id_usuario: id_usuario || reserva.id_usuario,
        id_vehiculo: id_vehiculo || reserva.id_vehiculo,
        hora_reserva: hora_reserva || reserva.hora_reserva,
        hora_devolucion: hora_devolucion || reserva.hora_devolucion,
        estado: estado || reserva.estado,
        total_final: total_final || reserva.total_final,
        seguro: seguro || reserva.seguro
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