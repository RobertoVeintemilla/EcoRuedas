const fs = require('fs')
const path = require('path')

const dataPath = path.join(__dirname, '../../data/users.json')

const leerDatos = () => {
    const jsonData = fs.readFileSync(dataPath);
    return JSON.parse(jsonData)
}

const escribirDatos = (data) =>{
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2))
}

//Controladores
const getUsers = (req, res) => {
    res.json(leerDatos())
}

const getUserById = (req, res) => {
    const id = parseInt(req.params.id);
    const user = leerDatos().users.find(u => u.id === id);
    res.json(user);
}

const createUser = (req, res) => {
    const datos = leerDatos();
    const { name, email, password } = req.body;
    const newUser = {
        id:datos.users.length + 1,
        name,
        email,
        password
    };
    datos.users.push(newUser);
    escribirDatos(datos)

    res.status(201).json({
        mensaje: "Usuario creado con éxito.", users: { id: newUser.id, name: newUser.name}
    })
}

const updateUser = (req, res) => {
    const datos = leerDatos();
    const id = parseInt(req.params.id);
    const { name, password } = req.body;
    const indice = datos.users.findIndex( u => u.id === id);

    if (indice === -1) {
        return res.status(401).json({ error: "Usuario no econtrado"})
    }
    //Actualizo solo los campos que vengan en el body (o mantenermos los viejos)
    datos.users[indice] = {
        ...datos.users[indice],
        name: name || datos.users[indice].name,
        password: password || datos.users[indice].password
    }
    escribirDatos(datos);
    res.json({ mensaje: "Usuario actualizado", user: datos.users[indice] })
}

const deleteUser = (req, res) => {
    const datos = leerDatos();
    const id = parseInt(req.params.id);

    //Verificar si existen antes de borrar
    const existe = datos.users.some(u => u.id === id)
    if(!existe) {
        return res.status(404).json({ error: "El usuario no existe "})
    }
    //Filtramos para dejar fuera al que queremos borrar
    datos.users = datos.users.filter(u => u.id !== id)
    escribirDatos(datos);
    res.json({ mensaje: `Usuario con ID:${id} eliminado correctamente` })
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}