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
        <div className="card p-3 p-md-4 shadow-sm d-flex flex-column" style={{ maxHeight: "100vh", overflowY: "auto" }}>
            <form onSubmit={handleSubmit} className="d-flex flex-column">
                <div className="mb-3">
                    <label className="form-label">Customer</label>
                    <Select
                        options={customers.map(cust => ({ value: cust.id, label: cust.name }))}
                        onChange={handleCustomerSelect}
                        placeholder="Select Customer"
                        isSearchable
                        className="mb-2"
                        styles={{ control: base => ({ ...base, minHeight: "40px" }) }}
                    />
                </div>

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

                <label className="form-label">Products</label>
                {ticket.products.map((product, index) => (
                    <div key={index} className="row g-2 mb-2 align-items-center">
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
                                    className="btn btn-outline-danger"
                                    title="Remove product"
                                >
                                    <i className="bi bi-x"></i>
                                </button>
                            )}
                        </div>
                    </div>
                ))}

                <div className="d-flex justify-content-end mb-3">
                    <button type="button" className="btn btn-secondary" onClick={addProductField}>
                        Add Product
                    </button>
                </div>

                <div className="row g-3 mb-3">
                    <div className="col-12 col-md-6">
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

                <button type="submit" className="btn btn-primary w-100">
                    Create Ticket
                </button>
            </form>
        </div>
    );
}
