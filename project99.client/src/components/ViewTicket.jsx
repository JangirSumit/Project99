// src/ViewTicket.jsx
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { GlobalStyle } from '../themes/GlobalStyle';
import {
    DesktopDetails,
    Card,
    Header,
    Title,
    StatusBadge,
    Divider,
    DetailText,
    ProductsContainer,
    ModalOverlay,
    ModalContent,
    ModalHeader
} from '../themes/ViewTicketStyles';

const statusMap = { 0: 'Input', 1: 'Chemical', 2: 'Production', 3: 'Done' };
const statusColorMap = { 0: 'secondary', 1: 'info', 2: 'warning', 3: 'success' };

export default function ViewTicket() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [selectedTicket, setSelectedTicket] = useState(null);
    const ticketId = searchParams.get('ticketid');

    useEffect(() => {
        if (ticketId) fetchTicket(ticketId);
    }, [ticketId]);

    const fetchTicket = async id => {
        try {
            const res = await fetch(`/api/tickets/${id}`);
            const data = await res.json();
            setSelectedTicket(data);
        } catch (err) {
            console.error('Error fetching ticket:', err);
        }
    };

    const closeTicket = () => {
        setSelectedTicket(null);
        navigate('/', { replace: true });
    };

    const getCustomerName = orgId => `Organization ${orgId}`;

    return (
        <>
            <GlobalStyle />

            {/* Desktop card */}
            {selectedTicket && (
                <DesktopDetails>
                    <Card>
                        <Header>
                            <Title>Ticket Details</Title>
                            <StatusBadge variant={statusColorMap[selectedTicket.status]}>
                                {statusMap[selectedTicket.status]}
                            </StatusBadge>
                        </Header>
                        <Divider />
                        <DetailText><strong>ID:</strong> {selectedTicket.id}</DetailText>
                        <DetailText>
                            <strong>Customer:</strong>{' '}
                            {selectedTicket.customer?.name || getCustomerName(selectedTicket.organizationId)}
                        </DetailText>
                        <DetailText><strong>Products:</strong></DetailText>
                        <ProductsContainer>
                            {JSON.parse(selectedTicket.products.replace(/'/g, '"')).map((prod, i) => (
                                <StatusBadge
                                    key={i}
                                    variant="secondary"
                                >
                                    {prod.quantity}× {prod.color}
                                </StatusBadge>
                            ))}
                        </ProductsContainer>
                    </Card>
                </DesktopDetails>
            )}

            {/* Mobile modal */}
            {selectedTicket && (
                <ModalOverlay onClick={closeTicket}>
                    <ModalContent onClick={e => e.stopPropagation()}>
                        <ModalHeader>
                            <h5>Ticket Details</h5>
                        </ModalHeader>
                        <DetailText>
                            <strong>Status:</strong>{' '}
                            <StatusBadge variant={statusColorMap[selectedTicket.status]}>
                                {statusMap[selectedTicket.status]}
                            </StatusBadge>
                        </DetailText>
                        <Divider />
                        <DetailText><strong>ID:</strong> {selectedTicket.id}</DetailText>
                        <DetailText>
                            <strong>Customer:</strong>{' '}
                            {selectedTicket.customer?.name || getCustomerName(selectedTicket.organizationId)}
                        </DetailText>
                        <DetailText><strong>Products:</strong></DetailText>
                        <ProductsContainer>
                            {JSON.parse(selectedTicket.products.replace(/'/g, '"')).map((prod, i) => (
                                <StatusBadge
                                    key={i}
                                    variant="secondary"
                                >
                                    {prod.quantity}× {prod.color}
                                </StatusBadge>
                            ))}
                        </ProductsContainer>
                    </ModalContent>
                </ModalOverlay>
            )}
        </>
    );
}
