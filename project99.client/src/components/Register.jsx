import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function TicketForm() {
    const [ticket, setTicket] = useState({
        title: "",
        description: "",
        customerId: "",
        productDescription: "",
        priority: 0,
        status: 0,
    });

    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await fetch("/api/tenants", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                const data = await response.json();
                setUsers(data.users);
            } catch (error) {
                console.error("Error fetching customers:", error);
            }
        };

        fetchCustomers();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTicket({
            ...ticket,
            [name]: name === "priority" || name === "status" ? Number(value) : value,
        });
    };

    const handleCustomerSelect = (e) => {
        const selectedCustomer = customers.find(customer => customer.name === e.target.value);
        if (selectedCustomer) {
            setTicket({ ...ticket, customerId: selectedCustomer.id });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/tickets/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(ticket),
            });
            if (!response.ok) {
                throw new Error("Failed to create ticket");
            }
            alert("Ticket Registered Successfully");
            setTicket({
                title: "",
                description: "",
                customerId: "",
                productDescription: "",
                priority: 0,
                status: 0,
            });
        } catch (error) {
            console.error("Error submitting ticket:", error);
            alert("Error registering ticket");
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Create New Ticket</h2>
            <div className="card p-4 shadow-sm">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Title</label>
                        <input type="text" name="title" value={ticket.title} onChange={handleChange} className="form-control" required />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Description</label>
                        <textarea name="description" value={ticket.description} onChange={handleChange} className="form-control" required />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Customer Name</label>
                        <input
                            type="search"
                            name="customerName"
                            list="customer-list"
                            className="form-control"
                            placeholder="Search or enter customer name"
                            onChange={handleCustomerSelect}
                            required
                        />
                        <datalist id="customer-list">
                            {customers.map((customer) => (
                                <option key={customer.id} value={customer.name} />
                            ))}
                        </datalist>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Product Description</label>
                        <input type="text" name="productDescription" value={ticket.productDescription} onChange={handleChange} className="form-control" required />
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label className="form-label">Priority</label>
                            <select name="priority" value={ticket.priority} onChange={handleChange} className="form-select">
                                <option value={0}>Low</option>
                                <option value={1}>Normal</option>
                                <option value={2}>High</option>
                            </select>
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Status</label>
                            <select name="status" value={ticket.status} onChange={handleChange} className="form-select">
                                <option value={0}>ToDo</option>
                                <option value={1}>In Progress</option>
                                <option value={2}>Done</option>
                                <option value={3}>Closed</option>
                            </select>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                        Create Ticket
                    </button>
                </form>
            </div>
        </div>
    );
}
