// src/components/UsersStyles.jsx
import styled from 'styled-components';
import { theme } from './GlobalStyle';

const mobile = '@media (max-width: 767px)';

// Page wrapper
export const Page = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${theme.spacing.lg};
  background: linear-gradient(
    135deg,
    ${theme.colors.gradientStart} 0%,
    ${theme.colors.gradientMid1} 25%,
    ${theme.colors.gradientMid2} 50%,
    ${theme.colors.gradientMid3} 75%,
    ${theme.colors.gradientEnd} 100%
  );
  perspective: 800px;

  ${mobile} {
    background: linear-gradient(
      180deg,
      var(--gradient-mobile-start) 0%,
      var(--gradient-mobile-mid) 50%,
      var(--gradient-mobile-end) 100%
    );
    padding: ${theme.spacing.md};
  }
`;

export const Card = styled.div`
  box-sizing: border-box;
  background: var(--bg-secondary);
  border-radius: ${theme.radii.md};
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 900px;
  margin: ${theme.spacing.lg} auto;
  padding: ${theme.spacing.lg};
  z-index: 1;

  ${mobile} {
    width: calc(100% - (2 * ${theme.spacing.md}));
    max-width: none;
    margin: ${theme.spacing.md} auto;
    padding: ${theme.spacing.md};
  }
`;

export const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  margin-bottom: ${theme.spacing.lg};
`;

// Table styles
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: ${theme.spacing.md};
    border-bottom: 1px solid ${theme.colors.border};
    text-align: left;
    white-space: nowrap;

    ${mobile} {
      padding: ${theme.spacing.sm};
      font-size: 0.9rem;
    }
  }

  thead {
    background: linear-gradient(45deg, #555, #777);
  }

  thead th {
    color: #fff;
  }
`;

// Form elements
export const Input = styled.input`
  width: 100%;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  margin-bottom: ${theme.spacing.md};
  font-family: ${theme.fonts.body};
  font-size: 1rem;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radii.md};
  outline: none;

  &:focus {
    border-color: ${theme.colors.accentHighlight};
    box-shadow: 0 0 0 3px rgba(136,136,136,0.2);
  }

  ${mobile} { font-size: 0.9rem; }
`;

export const SelectContainer = styled.div`
  margin-bottom: ${theme.spacing.md};
`;

// Buttons
export const Button = styled.button`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
font-family: ${theme.fonts.body};
border: none;
border-radius: ${theme.radii.md};
cursor: pointer;
color: #FFFFFF;
background: ${props => props.variant === 'danger' ? '#d9534f' : props.variant === 'secondary' ? '#6c757d' : '#0275d8'};
  

  &:hover { transform: scale(1.02); }
  &:last-child { margin-right: 0; }
  `;

// Modal components
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;


export const ModalContent = styled.div`
  position: relative;
  background: var(--bg-secondary);
  border-radius: ${theme.radii.md};
  width: 100%;
  max-width: 500px;
  padding: ${theme.spacing.lg};
  z-index: 10000;
`;


export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.md};
  h5 { margin: 0; font-family: ${theme.fonts.heading}; }
`;

export const ModalBody = styled.div`
  margin-bottom: ${theme.spacing.md};
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`;
