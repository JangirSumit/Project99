/* eslint-disable react-hooks/rules-of-hooks */
// src/Tickets.jsx
import { useEffect, useState, useContext } from 'react';
import { GlobalStyle } from '../themes/GlobalStyle';             // adjust path if your theme lives elsewhere
import {
    Page,
    Card,
    Table,
    ViewButton,
    Badge,
    ModalOverlay,
    ModalContent,
    TableContainer,
} from '../themes/HomeStyles';
import { GlobalContext } from '../contexts/GlobalContext';
import ForbiddenAccess from '../components/ForbiddenAccess';
import { useNavigate, useLocation } from 'react-router-dom';

const statusMap = { 0: 'Input', 1: 'Chemical', 2: 'Production', 3: 'Done' };
const statusOrder = { Production: 0, Chemical: 1, Input: 2, Done: 3 };

export default function Tickets() {
    const { state } = useContext(GlobalContext);
    const { profile } = state;
    const navigate = useNavigate();
    const location = useLocation();

    // only admins (role 0) may view
    if (profile.role !== 0) {
        return <ForbiddenAccess />;
    }

    const [tickets, setTickets] = useState([]);
    const [selectedTicket, setSelected] = useState(null);
    const [customers, setCustomers] = useState([]);

    // open the modal & fetch details
    const openTicket = async (id) => {
        const res = await fetch(`/api/tickets/${id}`);
        const data = await res.json();
        setSelected(data);
        navigate(`?ticketid=${id}`, { replace: false });
    };

    // close modal
    const closeTicket = () => {
        const params = new URLSearchParams(location.search);
        params.delete('ticketid');
        navigate(`?${params.toString()}`, { replace: false });
        setSelected(null);
    };

    // update status in both UI and backend
    const updateStatus = async (e) => {
        const newStatus = Number(e.target.value);
        const res = await fetch('/api/tickets/update-ticket', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Id: selectedTicket.id, status: newStatus })
        });
        if (res.ok) {
            setSelected({ ...selectedTicket, status: newStatus });
            setTickets(prev =>
                prev.map(t =>
                    t.id === selectedTicket.id ? { ...t, status: newStatus } : t
                )
            );
        }
    };

    // initial data load + handle URL param
    useEffect(() => {
        (async () => {
            const [custRes, tickRes] = await Promise.all([
                fetch('/api/tenents'),
                fetch('/api/tickets')
            ]);
            const custData = await custRes.json();
            const ticketData = await tickRes.json();

            // sort by your custom order
            ticketData.sort((a, b) =>
                statusOrder[statusMap[a.status]] - statusOrder[statusMap[b.status]]
            );

            setCustomers(custData);
            setTickets(ticketData);

            // if URL has ticketid, auto-open
            const qp = new URLSearchParams(location.search);
            const id = qp.get('ticketid');
            if (id) openTicket(id);
        })();
    }, [profile, location.search, navigate]);

    // helper to display customer name
    const getCustomerName = (orgId) => {
        if (!customers.length) return 'Loading...';
        const c = customers.find(x => x.id === orgId);
        return c?.name || 'Unknown';
    };

    return (
        <>
            <GlobalStyle />

            <Page>
                <h1>Ticket List</h1>

                <Card>
                    <TableContainer>
                    <Table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Customer</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {tickets.map(t => (
                                <tr key={t.id}>
                                    <td>{t.id}</td>
                                    <td>{getCustomerName(t.organizationId)}</td>
                                    <td>{statusMap[t.status]}</td>
                                    <td>
                                        <ViewButton onClick={() => openTicket(t.id)}>
                                            View
                                        </ViewButton>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        </Table>
                    </TableContainer>
                </Card>

                {selectedTicket && (
                    <ModalOverlay onClick={closeTicket}>
                        <ModalContent onClick={e => e.stopPropagation()}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <select
                                    value={selectedTicket.status}
                                    onChange={updateStatus}
                                >
                                    {Object.entries(statusMap).map(([k, label]) => (
                                        <option key={k} value={k}>{label}</option>
                                    ))}
                                </select>
                                <ViewButton onClick={closeTicket}>Close</ViewButton>
                            </div>

                            <hr />

                            <p><strong>ID:</strong> {selectedTicket.id}</p>
                            <p>
                                <strong>Customer:</strong>{' '}
                                {selectedTicket.customer?.name || getCustomerName(selectedTicket.organizationId)}
                            </p>
                            <p><strong>Products:</strong></p>
                            <div>
                                {JSON.parse(
                                    selectedTicket.products.replace(/'/g, '"')
                                ).map((prod, i) => (
                                    <Badge key={i}>
                                        {prod.quantity} x {prod.color}
                                    </Badge>
                                ))}
                            </div>
                        </ModalContent>
                    </ModalOverlay>
                )}
            </Page>
        </>
    );
}
