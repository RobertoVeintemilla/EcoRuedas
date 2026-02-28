import { useEffect, useState } from "react";
import { getUsers } from "../api/usersServices";

function ListaUsers() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersData = await getUsers();
                setUsers(usersData.users);
            } catch (err) {
                setError("Error al obtener los usuarios");
            }
        };

        fetchUsers();
    }, []);

    if (error) {
        return <p style={{ color: "red" }}>{error}</p>;
    }

    return (
        <div>
            <h2>Lista de Usuarios</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.name} - {user.email}</li>
                ))}
            </ul>
        </div>
    );
}

export default ListaUsers;