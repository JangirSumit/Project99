/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect, useContext } from 'react';
import Select from 'react-select';
import { GlobalContext } from '../contexts/GlobalContext';
import ForbiddenAccess from '../components/ForbiddenAccess';
import { GlobalStyle } from '../themes/GlobalStyle';
import {
    FormWrapper,
    Card,
    Field,
    Label,
    StyledInput,
    ProductsContainer,
    ProductRow,
    StyledSelect,
    Row,
    StyledButton
} from '../themes/TicketFormStyles';

export default function TicketForm() {
    const { state } = useContext(GlobalContext);
    const profile = state.profile;
    if (profile.role !== 0) {
        return <ForbiddenAccess />;
    }

    const [ticket, setTicket] = useState({
        title: '',
        organizationId: null,
        priority: 0,
        status: 0,
        products: [{ quantity: '', color: '' }]
    });
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch('/api/tenents');
                const data = await res.json();
                setCustomers(data);
            } catch (err) {
                console.error('Error fetching customers:', err);
            }
        })();
    }, []);

    const handleChange = e => {
        const { name, value } = e.target;
        setTicket(prev => ({
            ...prev,
            [name]: name === 'priority' || name === 'status' ? Number(value) : value
        }));
    };

    const handleCustomerSelect = option => {
        setTicket(prev => ({ ...prev, organizationId: option.value }));
    };

    const handleProductChange = (i, field, value) => {
        const prods = [...ticket.products];
        prods[i][field] = value;
        setTicket(prev => ({ ...prev, products: prods }));
    };

    const addProductField = () => {
        setTicket(prev => ({ ...prev, products: [...prev.products, { quantity: '', color: '' }] }));
    };

    const removeProductField = i => {
        setTicket(prev => ({ ...prev, products: prev.products.filter((_, idx) => idx !== i) }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const payload = { ...ticket };
            const res = await fetch('/api/tickets/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (!res.ok) throw new Error(await res.text());
            alert('Ticket Registered Successfully');
            setTicket({ title: '', organizationId: null, priority: 0, status: 0, products: [{ quantity: '', color: '' }] });
        } catch (err) {
            console.error('Error submitting ticket:', err);
            alert('Error registering ticket');
        }
    };

    return (
        <>
            <GlobalStyle />
            <FormWrapper>
                <Card>
                    <form onSubmit={handleSubmit}>
                        <Field>
                            <Label>Customer</Label>
                            <StyledSelect>
                                <Select
                                    options={customers.map(c => ({ value: c.id, label: c.name }))}
                                    onChange={handleCustomerSelect}
                                    placeholder="Select Customer"
                                    isSearchable
                                    classNamePrefix="react-select"
                                />
                            </StyledSelect>
                        </Field>

                        <Field>
                            <Label>Title</Label>
                            <StyledInput name="title" value={ticket.title} onChange={handleChange} required />
                        </Field>

                        <Field>
                            <Label>Products</Label>
                            <ProductsContainer>
                                {ticket.products.map((prod, idx) => (
                                    <ProductRow key={idx}>
                                        <StyledInput
                                            type="number"
                                            placeholder="Quantity"
                                            value={prod.quantity}
                                            onChange={e => handleProductChange(idx, 'quantity', e.target.value)}
                                            required
                                        />
                                        <StyledInput
                                            placeholder="Color"
                                            value={prod.color}
                                            onChange={e => handleProductChange(idx, 'color', e.target.value)}
                                            required
                                        />
                                        {ticket.products.length > 1 && (
                                            <StyledButton
                                                type="button"
                                                onClick={() => removeProductField(idx)}
                                            >
                                                −
                                            </StyledButton>
                                        )}
                                    </ProductRow>
                                ))}
                                <Row>
                                    <StyledButton type="button" onClick={addProductField}>
                                        Add Product
                                    </StyledButton>
                                </Row>
                            </ProductsContainer>
                        </Field>

                        <Row>
                            <Field style={{ flex: 1 }}>
                                <Label>Priority</Label>
                                <select
                                    name="priority"
                                    value={ticket.priority}
                                    onChange={handleChange}
                                    className="form-select"
                                >
                                    <option value={0}>Low</option>
                                    <option value={1}>Normal</option>
                                    <option value={2}>High</option>
                                </select>
                            </Field>
                            <Field style={{ flex: 1 }}>
                                <Label>Status</Label>
                                <select
                                    name="status"
                                    value={ticket.status}
                                    onChange={handleChange}
                                    className="form-select"
                                >
                                    <option value={0}>Input</option>
                                    <option value={1}>Chemical</option>
                                    <option value={2}>Production</option>
                                    <option value={3}>Done</option>
                                </select>
                            </Field>
                        </Row>

                        <StyledButton type="submit">Create Ticket</StyledButton>
                    </form>
                </Card>
            </FormWrapper>
        </>
    );
}