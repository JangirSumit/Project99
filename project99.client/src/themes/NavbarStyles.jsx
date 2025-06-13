// src/components/NavbarStyles.jsx
import styled from 'styled-components';
import { theme } from './GlobalStyle';

// Breakpoints
const mobile = '@media (max-width: 767px)';

// Desktop Navbar
export const DesktopNav = styled.nav`
  width: 100%;
  background: var(--gradient-mid2);
  display: none;
  @media (min-width: 768px) {
    display: flex;
  }
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

export const Brand = styled.div`
  font-family: ${theme.fonts.heading};
  font-size: 1.5rem;
  color: #fff;
`;

export const NavLinks = styled.ul`
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
  gap: ${theme.spacing.lg};
`;

export const NavLink = styled.li`
  font-family: ${theme.fonts.body};
  a, button {
    color: #fff;
    text-decoration: none;
    font-size: 1rem;
    display: flex;
    align-items: center;
    gap: ${theme.spacing.sm};
    background: none;
    border: none;
    cursor: pointer;
    padding: ${theme.spacing.sm};
  }
`;

// Mobile Bottom Navbar
export const MobileNav = styled.nav`
  position: fixed;
  bottom: 0;
  width: 100%;
  background: var(--bg-secondary);
  z-index: 1000;
  display: none;

  /* Show only on mobile */
  @media (max-width: 767px) {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: ${theme.spacing.sm} 0;
    box-shadow: 0 -2px 4px rgba(0,0,0,0.1);
  }
`;

export const MobileButton = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== '$active'
})`
  background: none;
  border: none;
  text-align: center;
  font-family: ${theme.fonts.body};
  color: ${({ $active }) => ($active ? theme.colors.accentHighlight : '#555')};
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.75rem;
  cursor: pointer;
  gap: ${theme.spacing.xs};
  svg {
    font-size: 1.25rem;
  }
`;
