import { useEffect, useState } from "react";
import Role from "../common/Role";
import useLocalStorage from "../hooks/useLocalStorage";
import Select from "react-select";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [organizations, setOrganizations] = useState([]);
    const [newUser, setNewUser] = useState({ id: 0, name: "", userName: "", role: 1, password: "User@123", organizationId: 0 });
    const [authToken] = useLocalStorage("authToken", "");

    useEffect(() => {
        async function getUsers() {
            try {
                const response = await fetch("/api/users", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${authToken.token}`
                    }
                });
                const data = await response.json();
                setUsers(data.users);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        }

        async function getOrganizations() {
            try {
                const response = await fetch("/api/tenents", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                const data = await response.json();
                setOrganizations(data);
            } catch (error) {
                console.error("Error fetching organizations:", error);
            }
        }

        getUsers();
        getOrganizations();
    }, []);

    const handleInputChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    };

    const handleCustomerSelect = (selectedOption) => {
        if (selectedOption) {
            setNewUser(prevUser => ({ ...prevUser, organizationId: selectedOption.value }));
        }
    };

    const addUser = async () => {
        try {
            const response = await fetch("/api/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authToken.token}`
                },
                body: JSON.stringify(newUser)
            });

            if (!response.ok) {
                throw new Error("Failed to register user");
            }

            const addedUserId = await response.json();
            setUsers([...users, { ...newUser, id: addedUserId }]);
            setNewUser({ id: 0, name: "", userName: "", role: 1, password: "User@123", organizationId: null });
        } catch (error) {
            console.error("Error adding user:", error);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Users</h2>
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>Name</th>
                            <th>Username</th>
                            <th>Role</th>
                            <th>Organization</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users && users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.userName}</td>
                                <td>{Role[user.role]}</td>
                                <td>{user.organizationId}</td>
                                <td>
                                    {user.userName !== "admin" && (
                                        <button className="btn btn-danger btn-sm" onClick={() => deleteUser(user.id, user.userName)}>
                                            Delete
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <button className="btn btn-primary mt-3" data-bs-toggle="modal" data-bs-target="#addUserModal">
                Add New User
            </button>

            <div className="modal fade" id="addUserModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
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
                                name="userName"
                                className="form-control mb-2"
                                placeholder="Username"
                                value={newUser.userName}
                                onChange={handleInputChange}
                            />
                            <input
                                type="password"
                                name="password"
                                className="form-control mb-2"
                                placeholder="Initial Password"
                                value={newUser.password}
                                onChange={handleInputChange}
                            />

                            <Select
                                options={organizations.map(org => ({ value: org.id, label: org.name }))}
                                onChange={handleCustomerSelect}
                                placeholder="Select Organization"
                                isSearchable
                                className="mb-2"
                            />

                            <select name="role" className="form-select" value={newUser.role} onChange={handleInputChange}>
                                <option value="0">Admin</option>
                                <option value="1">User</option>
                            </select>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button className="btn btn-success" data-bs-dismiss="modal" onClick={addUser}>
                                Add User
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Users;
