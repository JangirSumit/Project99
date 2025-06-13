import styled from 'styled-components';
import { theme } from './GlobalStyle';

// Breakpoints
const mobile = '@media (max-width: 767px)';

export const DesktopDetails = styled.div`
  display: none;
  @media (min-width: 768px) {
    display: block;
  }
  margin-top: ${theme.spacing.lg};
  width: 100%;
  max-width: auto;
`;

export const Card = styled.div`
  background: var(--bg-secondary);
  border-radius: ${theme.radii.md};
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  padding: ${theme.spacing.lg};
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${theme.spacing.md};
`;

export const Title = styled.h3`
  margin: 0;
  font-family: ${theme.fonts.heading};
`;

export const StatusBadge = styled.span`
  padding: 4px 8px;
  border-radius: ${theme.radii.md};
  font-size: 0.9rem;
  color: #fff;
  background: ${({ variant }) => {
        switch (variant) {
            case 'secondary': return '#6c757d';
            case 'info': return '#0dcaf0';
            case 'warning': return '#ffc107';
            case 'success': return '#198754';
            default: return '#6c757d';
        }
    }};
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${theme.colors.border};
  margin: ${theme.spacing.md} 0;
`;

export const DetailText = styled.p`
  margin: ${theme.spacing.sm} 0;
`;

export const ProductsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm};
`;

// Mobile Modal
export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0,0,0,0.5);
  display: none;
  align-items: center;
  justify-content: center;
  z-index: 9999;

  ${mobile} {
    display: flex;
  }
`;

export const ModalContent = styled.div`
  background: var(--bg-secondary);
  border-radius: ${theme.radii.md};
  width: 90%;
  max-width: 500px;
  padding: ${theme.spacing.lg};
`;

export const ModalHeader = styled.div`
  margin-bottom: ${theme.spacing.md};
  h5 { margin: 0; font-family: ${theme.fonts.heading}; }
`;
