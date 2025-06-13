// src/themes/HomeStyles.jsx
import styled from 'styled-components';
import { theme } from './GlobalStyle';

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
`;

// Card for content blocks
export const Card = styled.div`
  background: var(--bg-secondary);
  border-radius: ${theme.radii.md};
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  padding: ${theme.spacing.lg};
  width: 100%;
  max-width: 800px;
  margin-bottom: ${theme.spacing.lg};
`;

// Table
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  th, td {
    padding: ${theme.spacing.md};
    border-bottom: 1px solid ${theme.colors.border};
    text-align: left;
  }
  thead { background: linear-gradient(45deg, #555, #777); }
  thead th { color: #fff; }
`;

export const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  margin-bottom: ${theme.spacing.lg};
`;

// Button to view
export const ViewButton = styled.button`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  font-family: ${theme.fonts.body};
  background: linear-gradient(45deg, #555, #777);
  color: #fff;
  border: none;
  border-radius: ${theme.radii.md};
  cursor: pointer;
`;

// Badge for products/status
export const Badge = styled.span`
  display: inline-block;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background: ${theme.colors.border};
  border-radius: ${theme.radii.md};
  color: #333;
`;

// Modal overlay
export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

// Modal content container
export const ModalContent = styled.div`
  background: var(--bg-secondary);
  border-radius: ${theme.radii.md};
  box-shadow: 0 4px 20px rgba(0,0,0,0.2);
  padding: ${theme.spacing.lg};
  width: 90%;
  max-width: 600px;
`;
