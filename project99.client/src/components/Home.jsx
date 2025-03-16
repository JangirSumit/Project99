import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Tickets = () => {
    const [tickets, setTickets] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState(null);

    useEffect(() => {
        async function getTickets() {
            try {
                const response = await fetch("/api/tickets", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                const data = await response.json();
                setTickets(data);
            } catch (error) {
                console.error("Error fetching tickets:", error);
            }
        }
        getTickets();
    }, []);

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
                                <th>Title</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tickets.map((ticket) => (
                                <tr key={ticket.id}>
                                    <td>{ticket.id}</td>
                                    <td>{ticket.title}</td>
                                    <td>{ticket.status}</td>
                                    <td>
                                        <button className="btn btn-outline-primary btn-sm" onClick={() => handleViewTicket(ticket.id)}>View</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {selectedTicket && (
                <div className="card mt-4">
                    <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                            <h3>Ticket Details</h3>
                            <button className="btn btn-outline-danger btn-sm" onClick={handleCloseTicket}>Close</button>
                        </div>
                        <p><strong>ID:</strong> {selectedTicket.id}</p>
                        <p><strong>Title:</strong> {selectedTicket.title}</p>
                        <p><strong>Status:</strong> {selectedTicket.status}</p>
                        <p><strong>Description:</strong> {selectedTicket.description}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Tickets;
