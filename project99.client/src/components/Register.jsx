import { useState, useEffect } from "react";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";

export default function TicketForm() {
    const [ticket, setTicket] = useState({
        title: "",
        organizationId: null,
        priority: 0,
        status: 0,
        products: [{ quantity: "", color: "" }],
    });

    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await fetch("/api/tenents", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });
                const data = await response.json();
                setCustomers(data);
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

    const handleCustomerSelect = (selectedOption) => {
        if (selectedOption) {
            setTicket(prev => ({ ...prev, organizationId: selectedOption.value }));
        }
    };

    const handleProductChange = (index, field, value) => {
        const updatedProducts = [...ticket.products];
        updatedProducts[index][field] = value;
        setTicket(prev => ({ ...prev, products: updatedProducts }));
    };

    const addProductField = () => {
        setTicket(prev => ({
            ...prev,
            products: [...prev.products, { quantity: "", color: "" }],
        }));
    };

    const removeProductField = (index) => {
        const updatedProducts = [...ticket.products];
        updatedProducts.splice(index, 1);
        setTicket(prev => ({ ...prev, products: updatedProducts }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...ticket,
                products: ticket.products,
            };

            const response = await fetch("/api/tickets/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || "Failed to create ticket");
            }

            alert("Ticket Registered Successfully");

            await fetch("https://app-server.wati.io/api/v1/sendTemplateMessage?whatsappNumber=919024544868", {
                method: "POST",
                headers: {
                    "accept": "*/*",
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0M2U3MzY4NS0wZmFhLTQ0OWItYmIwNC0yMTM2ZmQ5YmZhY2IiLCJ1bmlxdWVfbmFtZSI6ImFkaXR5YWphbmdpcjIyOTlAZ21haWwuY29tIiwibmFtZWlkIjoiYWRpdHlhamFuZ2lyMjI5OUBnbWFpbC5jb20iLCJlbWFpbCI6ImFkaXR5YWphbmdpcjIyOTlAZ21haWwuY29tIiwiYXV0aF90aW1lIjoiMDYvMDQvMjAyNSAwOTo1Nzo1OCIsImRiX25hbWUiOiJ3YXRpX2FwcF90cmlhbCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlRSSUFMIiwiZXhwIjoxNzQ5Njg2NDAwLCJpc3MiOiJDbGFyZV9BSSIsImF1ZCI6IkNsYXJlX0FJIn0.PeO46Roei0R1aK8xjmSic0kN1kNymr-XPsoFHWB57mM",
                    "Content-Type": "application/json-patch+json"
                },
                body: JSON.stringify({
                    template_name: "welcome_wati_v1",
                    broadcast_name: "welcome_wati_v1",
                    parameters: [
                        {
                            name: "name",
                            value: "Aditya"
                        }
                    ]
                }),
            });

            setTicket({
                title: "",
                organizationId: null,
                priority: 0,
                status: 0,
                products: [{ quantity: "", color: "" }],
            });
        } catch (error) {
            console.error("Error submitting ticket:", error);
            alert("Error registering ticket");
        }
    };

        return (
            <div className="container-fluid px-3 pt-3" style={{ paddingBottom: "7rem" }}>
                <form onSubmit={handleSubmit}>
                    {/* Customer Dropdown */}
                    <div className="mb-3">
                        <label className="form-label">Customer</label>
                        <Select
                            options={customers.map(c => ({ value: c.id, label: c.name }))}
                            onChange={handleCustomerSelect}
                            placeholder="Select Customer"
                            isSearchable
                            styles={{ control: base => ({ ...base, minHeight: "40px" }) }}
                        />
                    </div>

                    {/* Title */}
                    <div className="mb-3">
                        <label className="form-label">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={ticket.title}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>

                    {/* Products */}
                    <div className="mb-3">
                        <label className="form-label">Products</label>
                        {ticket.products.map((product, index) => (
                            <div className="row g-2 mb-2 align-items-center" key={index}>
                                <div className="col-5">
                                    <input
                                        type="number"
                                        placeholder="Quantity"
                                        value={product.quantity}
                                        onChange={(e) => handleProductChange(index, "quantity", e.target.value)}
                                        className="form-control"
                                        required
                                    />
                                </div>
                                <div className="col-5">
                                    <input
                                        type="text"
                                        placeholder="Color"
                                        value={product.color}
                                        onChange={(e) => handleProductChange(index, "color", e.target.value)}
                                        className="form-control"
                                        required
                                    />
                                </div>
                                <div className="col-2 text-end">
                                    {ticket.products.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeProductField(index)}
                                            className="btn btn-outline-danger btn-sm"
                                        >
                                            <i className="bi bi-x"></i>
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                        <div className="text-end">
                            <button type="button" className="btn btn-secondary btn-sm" onClick={addProductField}>
                                Add Product
                            </button>
                        </div>
                    </div>

                    {/* Priority and Status */}
                    <div className="row mb-4">
                        <div className="col-12 col-md-6 mb-3">
                            <label className="form-label">Priority</label>
                            <select name="priority" value={ticket.priority} onChange={handleChange} className="form-select">
                                <option value={0}>Low</option>
                                <option value={1}>Normal</option>
                                <option value={2}>High</option>
                            </select>
                        </div>

                        <div className="col-12 col-md-6">
                            <label className="form-label">Status</label>
                            <select name="status" value={ticket.status} onChange={handleChange} className="form-select">
                                <option value={0}>Input</option>
                                <option value={1}>Chemical</option>
                                <option value={2}>Production</option>
                                <option value={3}>Done</option>
                            </select>
                        </div>
                    </div>

                    {/* Submit Button (scrolls with form) */}
                    <div className="mt-3">
                        <button type="submit" className="btn btn-primary w-100">
                            Create Ticket
                        </button>
                    </div>
                </form>
            </div>
        );
    }