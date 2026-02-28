import api from "./axiosConfig";

export const getUsers = async () => {
    //Ya no es necesario pasar el token, el interceptor lo hace automáticamente
    const response = await api.get('/users');
    return response.data;
}

export const getUserById = async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
}

export const createUser = async (name, email, password) => {
    const response = await api.post('/register', { name, email, password });
    return response.data;
}

export const login = async (email, password) => {
    const response = await api.post('/login', { email, password });
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    return response.data;
}

export const updateUser = async (id, name, email, password) => {
    const response = await api.put(`/users/${id}`, { name, email, password });
    return response.data;
}

export const deleteUser = async (id) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
}