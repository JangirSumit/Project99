/* eslint-disable react-hooks/rules-of-hooks */
// src/Users.jsx
import { useState, useEffect, useContext } from 'react';
import { GlobalStyle } from '../themes/GlobalStyle';
import {
    Page,
    Card,
    Table,
    Input,
    SelectContainer,
    Button,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    TableContainer,
} from '../themes/UsersStyles';
import { GlobalContext } from '../contexts/GlobalContext';
import Role from '../common/Role';
import ForbiddenAccess from '../components/ForbiddenAccess';
import Select from 'react-select';
import useLocalStorage from '../hooks/useLocalStorage';

export default function Users() {
    const { state } = useContext(GlobalContext);
    const profile = state.profile;
    const [authToken] = useLocalStorage('authToken', '');
    const [users, setUsers] = useState([]);
    const [organizations, setOrganizations] = useState([]);
    const [newUser, setNewUser] = useState({
        id: 0,
        name: '',
        userName: '',
        role: 1,
        password: 'User@123',
        organizationId: null
    });
    const [showModal, setShowModal] = useState(false);

    // Only admins can view
    if (profile.role !== 0) {
        return <ForbiddenAccess />;
    }

    // Load users & orgs on mount
    useEffect(() => {
        async function load() {
            try {
                const [uRes, oRes] = await Promise.all([
                    fetch('/api/users', {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${authToken.token}`
                        }
                    }),
                    fetch('/api/tenents', {
                        headers: { 'Content-Type': 'application/json' }
                    })
                ]);
                const uData = await uRes.json();
                const oData = await oRes.json();
                setUsers(uData.users);
                setOrganizations(oData);
            } catch (err) {
                console.error('Error loading users/orgs:', err);
            }
        }
        load();
    }, [authToken.token]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser(prev => ({ ...prev, [name]: value }));
    };

    const handleCustomerSelect = (option) => {
        setNewUser(prev => ({ ...prev, organizationId: option.value }));
    };

    const deleteUser = async (id, userName) => {
        try {
            const res = await fetch('/api/users/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authToken.token}`
                },
                body: JSON.stringify({ id, userName })
            });
            if (!res.ok) throw new Error('Delete failed');
            setUsers(prev => prev.filter(u => u.id !== id));
        } catch (err) {
            console.error('Error deleting user:', err);
        }
    };

    const addUser = async () => {
        try {
            const res = await fetch('/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authToken.token}`
                },
                body: JSON.stringify(newUser)
            });
            if (!res.ok) throw new Error('Register failed');
            const addedId = await res.json();
            setUsers(prev => [...prev, { ...newUser, id: addedId }]);
            setNewUser({
                id: 0,
                name: '',
                userName: '',
                role: 1,
                password: 'User@123',
                organizationId: null
            });
            setShowModal(false);
        } catch (err) {
            console.error('Error adding user:', err);
        }
    };

    return (
        <>
            <GlobalStyle />
            <Page>
                <Card>
                    <h2>Users</h2>
                    <TableContainer>
                    <Table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Username</th>
                                <th>Role</th>
                                <th>Organization</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(u => (
                                <tr key={u.id}>
                                    <td>{u.name}</td>
                                    <td>{u.userName}</td>
                                    <td>{Role[u.role]}</td>
                                    <td>{u.organizationId}</td>
                                    <td>
                                        {u.userName !== 'admin' && (
                                            <Button variant="danger" onClick={() => deleteUser(u.id, u.userName)}>
                                                Delete
                                            </Button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                    </Table>
                </TableContainer>
                    <Button variant="primary" onClick={() => setShowModal(true)}>
                        Add New User
                    </Button>
                </Card>

                {showModal && (
                    <ModalOverlay onClick={() => setShowModal(false)}>
                        <ModalContent onClick={e => e.stopPropagation()}>
                            <ModalHeader>
                                <h5>Add New User</h5>
                                <Button variant="secondary" onClick={() => setShowModal(false)}>x</Button>
                            </ModalHeader>
                            <ModalBody>
                                <Input
                                    name="name"
                                    placeholder="Name"
                                    value={newUser.name}
                                    onChange={handleInputChange}
                                />
                                <Input
                                    name="userName"
                                    placeholder="Username"
                                    value={newUser.userName}
                                    onChange={handleInputChange}
                                />
                                <Input
                                    type="password"
                                    name="password"
                                    placeholder="Initial Password"
                                    value={newUser.password}
                                    onChange={handleInputChange}
                                />
                                <SelectContainer>
                                    <Select
                                        options={organizations.map(o => ({ value: o.id, label: o.name }))}
                                        onChange={handleCustomerSelect}
                                        placeholder="Select Organization"
                                        isSearchable
                                        classNamePrefix="react-select"
                                    />
                                </SelectContainer>
                                <select
                                    name="role"
                                    value={newUser.role}
                                    onChange={handleInputChange}
                                    style={{
                                        width: '100%',
                                        padding: '8px',
                                        marginBottom: '16px',
                                        borderRadius: 'var(--radius-md)',
                                        border: '1px solid var(--border)',
                                        fontFamily: 'var(--font-body)'
                                    }}
                                >
                                    <option value={0}>Admin</option>
                                    <option value={1}>User</option>
                                </select>
                            </ModalBody>
                            <ModalFooter>
                                <Button variant="secondary" onClick={() => setShowModal(false)} marginright="8px">
                                    Close
                                </Button>
                                <Button variant="primary" onClick={addUser}>
                                    Add User
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </ModalOverlay>
                )}
            </Page>
        </>
    );
}
