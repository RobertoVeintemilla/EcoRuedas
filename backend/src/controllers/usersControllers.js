const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'clave_secreta_para_jwt'; // En producción, esta clave debe ser segura y no estar hardcodeada
const bycrypt = require('bcrypt');

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

    //Generar el "Hash" (segundo parámetro es el número de rondas de seguridad)
    const hashedPassword = bycrypt.hashSync(password, 10);

    const newId = datos.users.length > 0
        ? Math.max(...datos.users.map(u => u.id)) + 1
        : 1;

    const newUser = {
        id:newId,
        name,
        email,
        password: hashedPassword
    };
    datos.users.push(newUser);
    escribirDatos(datos)

    res.status(201).json({
        mensaje: "Usuario creado con éxito.", users: { id: newUser.id, name: newUser.name}
    })
}

const loginUser = (req, res) => {
    const { email, password } = req.body;
    const datos = leerDatos();
    const user = datos.users.find(u => u.email === email);
    if (!user) {
        return res.status(401).json({ error: "Credenciales malas" });
    }
    const isTrue = bycrypt.compareSync(password, user.password);
    if (!isTrue) {
        return res.status(401).json({ error: "Credenciales inválidas" })
    }
    const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ mensaje: "Login exitoso", user, token })
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
    loginUser
}