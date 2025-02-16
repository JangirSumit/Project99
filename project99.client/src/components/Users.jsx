import { useEffect, useState } from "react";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ name: "", username: "", role: "User" });

    const handleInputChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    };

    const addUser = () => {
        setUsers([...users, { ...newUser, id: users.length + 1 }]);
        setNewUser({ name: "", username: "", role: "User" });
    };

    useEffect(() => {
        async function getUsers() {
            try {
                const response = await fetch("/api/users");
                const data = await response.json();

                setUsers(data)
            } catch (e) {
                console.error(e);
            }
        }

        getUsers();
    }, [])

    return (
        <div className="container mt-4">
            <h2>Users</h2>
            <table className="table table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.username}</td>
                            <td>{user.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Button to trigger modal */}
            <button
                className="btn btn-primary mt-3"
                data-bs-toggle="modal"
                data-bs-target="#addUserModal"
            >
                Add New User
            </button>

            {/* Modal for adding new user */}
            <div className="modal fade" id="addUserModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add New User</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <input
                                type="text"
                                name="name"
                                className="form-control mb-2"
                                placeholder="Name"
                                value={newUser.name}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="username"
                                className="form-control mb-2"
                                placeholder="Username"
                                value={newUser.username}
                                onChange={handleInputChange}
                            />
                            <select
                                name="role"
                                className="form-select"
                                value={newUser.role}
                                onChange={handleInputChange}
                            >
                                <option value="Admin">Admin</option>
                                <option value="User">User</option>
                            </select>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button className="btn btn-success" data-bs-dismiss="modal" onClick={addUser}>Add User</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Users;
