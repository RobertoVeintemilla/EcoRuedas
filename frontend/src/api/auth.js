import axios from 'axios';
const API_URL = 'http://localhost:3000';

export const login = async (email, password) => {
    //enviamos los datos al backend
    const response = await axios.post(`${API_URL}/api/login`, { email, password });
    //Si el login es exitoso, guardamos el token en localStorage
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        return response.data;
    }
    throw new Error(response.data.error || 'Error en el login');
};

export const register = async (name, email, password) => {
    const response = await axios.post(`${API_URL}/api/register`, { name, email, password });
    return response.data;
};