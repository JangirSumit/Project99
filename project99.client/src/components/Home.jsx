import { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import "bootstrap/dist/css/bootstrap.min.css";

const statusMap = {
    0: "Input",
    1: "Chemical",
    2: "Production",
    3: "Done",
};

const statusOrder = {
    "Production": 0,
    "Chemical": 1,
    "Input": 2,
    "Done": 3,
};

const Tickets = () => {
    const [tickets, setTickets] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [customers, setCustomers] = useState([]);
    const { state } = useContext(GlobalContext);
    const profile = state.profile;

    const handleViewTicket = async (id) => {
        try {
            const response = await fetch(`/api/tickets/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            setSelectedTicket(data);
        } catch (error) {
            console.error("Error fetching ticket details:", error);
        }
    };

    const handleCloseTicket = () => {
        setSelectedTicket(null);
    };

    const handleStatusChange = async (e) => {
        const newStatus = Number(e.target.value);
        try {
            const response = await fetch(`/api/tickets/update-ticket`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ Id: selectedTicket.id, status: newStatus }),
            });

            if (response.ok) {
                setSelectedTicket({ ...selectedTicket, status: newStatus });
                setTickets(prev =>
                    prev.map(t => t.id === selectedTicket.id ? { ...t, status: newStatus } : t)
                );
            }
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    useEffect(() => {
        const fetchCustomersAndTickets = async () => {
            try {
                // Fetch customers first
                let customerApiUrl = profile.role === 0
                    ? "/api/tenents"
                    : `/api/tenents/${profile.OrganizationId}`;

                const customerRes = await fetch(customerApiUrl);
                const customerData = await customerRes.json();
                setCustomers(customerData);

                // Then fetch tickets
                let ticketApiUrl = profile.role === 0
                    ? "/api/tickets"
                    : `/api/tickets/${profile.OrganizationId}`;

                const ticketRes = await fetch(ticketApiUrl, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" }
                });
                const ticketData = await ticketRes.json();

                // Sort tickets based on status order
                ticketData.sort((a, b) => {
                    const aLabel = statusMap[a.status];
                    const bLabel = statusMap[b.status];
                    return statusOrder[aLabel] - statusOrder[bLabel];
                });

                setTickets(ticketData);
            } catch (error) {
                console.error("Error fetching customers or tickets:", error);
            }
        };

            fetchCustomersAndTickets();
    }, [profile]);

    const getCustomerName = (id) => {
        if (!customers.length) return "Loading...";
        const customer = customers.find(c => c.id === id);
        return customer?.name || "Unknown";
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4 d-flex align-items-center">
                <i className="bi bi-ticket-detailed me-2"></i> Ticket List
            </h1>
            <div className="card">
                <div className="card-body">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Customer</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {tickets.map((ticket) => {
                                return (
                                    <tr key={ticket.id}>
                                        <td>{ticket.id}</td>
                                        <td>{getCustomerName(ticket.organizationId)}</td>
                                        <td>{statusMap[ticket.status]}</td>
                                        <td>
                                            <button className="btn btn-outline-primary btn-sm" onClick={() => handleViewTicket(ticket.id)}>View</button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {selectedTicket && (
                <div className="card mt-4">
                    <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                            <h3 className="mb-0">Ticket Details</h3>
                            <div className="d-flex align-items-center gap-2">
                                <select
                                    value={selectedTicket.status}
                                    onChange={handleStatusChange}
                                    className="form-select form-select-sm"
                                    style={{ width: "150px" }}
                                >
                                    {Object.entries(statusMap).map(([key, label]) => (
                                        <option key={key} value={key}>{label}</option>
                                    ))}
                                </select>
                                <button className="btn btn-outline-danger btn-sm" onClick={handleCloseTicket}>
                                    Close
                                </button>
                            </div>
                        </div>
                        <hr />
                        <p><strong>ID:</strong> {selectedTicket.id}</p>
                        <p><strong>Customer:</strong> {selectedTicket.customer?.name || getCustomerName(selectedTicket.organizationId)}</p>
                        <p><strong>Products:</strong></p>
                        <div className="d-flex flex-wrap gap-2">
                            {selectedTicket.products?.map((prod, index) => (
                                <span key={index} className="badge bg-secondary">
                                    {prod.quantity}x {prod.color}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Tickets;
