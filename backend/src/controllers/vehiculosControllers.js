const fs = require('fs');
const path = require('path')

const dataPath = path.join(__dirname, '../../data/vehiculos.json');

const leerDatos = () => {
    const jsonData = fs.readFileSync(dataPath);
    return JSON.parse(jsonData)
}

const escribirDatos = (data) => {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

//Controladores
const getVehicles = (req, res) => {
    const datos = leerDatos()
    res.json(datos)    
}

const getVehiclesById = (req, res) => {
    const id = parseInt(req.params.id);
    const vehicle = leerDatos().find(u => u.id === id);
    res.json(vehicle);
}

const createVechicle = (req, res) => {
    const datos = leerDatos();
    const { tipo, marca, modelo, año, color, precio_por_dia, disponibilidad } = req.body;
    const newVehicle = {
        id: datos.length + 1,
        tipo,
        marca,
        modelo,
        año,
        color,
        precio_por_dia,
        disponibilidad
    };
    datos.push(newVehicle);
    escribirDatos(datos);

    res.status(201).json({
        mensaje: "Vehiculo agregado con éxio", vehicle: { id: newVehicle.id, tipo: newVehicle.tipo, marca: newVehicle.marca}
    })
}

const updateVehicle = (req, res) => {
    const datos = leerDatos();
    const id = parseInt(req.params.id);
    const { tipo, marca, modelo, año, color, precio_por_dia, disponibilidad} = req.body;
    const indice = datos.findIndex(u => u.id === id);

    if (indice === -1) {
        return res.status(401).json({ error: "Vehiculo no encontrado"})
    }
    //Actualizo solo los campos que vengan en el body (o mantiene los viejos)
    datos[indice] = {
        ...datos[indice],
        marca: marca || datos[indice].marca,
        modelo: modelo || datos[indice].modelo,
        tipo: tipo || datos[indice].tipo,
        año: año || datos[indice].año,
        color: color || datos[indice].color,
        precio_por_dia: precio_por_dia || datos[indice].precio_por_dia,
        disponibilidad: disponibilidad || datos[indice].disponibilidad,
    }

    escribirDatos(datos);
    res.json({ mensaje: "Vehiculo actualizado", vehicle: datos[indice] })
}

const deleteVehicle = (req, res) => {
    let datos = leerDatos();
    const id = parseInt(req.params.id);

    //Verificar si existen antes de borrar
    const exist = datos.some(u => u.id === id)
    if(!exist) {
        return res.status(404).json({ error : "Vehiculo no encontrado"})
    }
    datos = datos.filter(u => u.id !== id);
    escribirDatos(datos);
    res.json({ mensaje: `Vehiculo con ID:${id} eliminado correctamente`})
}

module.exports = {
    getVehicles,
    getVehiclesById,
    createVechicle,
    updateVehicle,
    deleteVehicle
}