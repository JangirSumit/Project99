import styled from 'styled-components';
import { theme } from './GlobalStyle';

export const Page = styled.div`
  overflow: hidden;
  position: relative;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, ${theme.colors.gradientStart} 0%, ${theme.colors.gradientMid1} 25%, ${theme.colors.gradientMid2} 50%, ${theme.colors.gradientMid3} 75%, ${theme.colors.gradientEnd} 100%);
  perspective: 800px;

  /* Top ribbon */
  &::before {
    content: "";
    position: absolute;
    top: 15%;
    left: -50%;
    width: 200%;
    height: 30%;
    background: rgba(200,200,200,0.2);
    transform-origin: center;
    transform: rotateX(30deg) rotateZ(-15deg) skewY(-10deg);
    box-shadow: 0 8px 20px rgba(0,0,0,0.2);
    pointer-events: none;
  }

  /* Noise overlay */
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='6' seed='99'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>") no-repeat center/cover;
    mix-blend-mode: overlay;
    opacity: 0.4;
    pointer-events: none;
  }
`;

export const Card = styled.div`
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  padding: var(--space-lg);
  width: 100%;
  max-width: 350px;
  z-index: 1;
`;

export const Title = styled.h2`
  font-family: var(--font-heading);
  font-size: 1.75rem;
  color: #333333;
  text-align: center;
  margin-bottom: var(--space-md);
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
`;

export const Input = styled.input`
  padding: var(--space-sm) var(--space-md);
  font-family: var(--font-body);
  font-size: 1rem;
  color: #333333;
  background: #F0F0F0;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  outline: none;

  &:focus {
    border-color: var(--accent-highlight);
    box-shadow: 0 0 0 3px rgba(136,136,136,0.2);
  }
`;

export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-sm);
`;

export const Label = styled.label`
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: #555555;
`;

export const Button = styled.button`
  padding: var(--space-sm) var(--space-md);
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 500;
  color: #FFFFFF;
  background: linear-gradient(45deg, #555555, #777777);
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  transition: transform 0.1s ease-in-out;

  &:hover {
    transform: ${({ disabled }) => (disabled ? 'none' : 'scale(1.02)')};
  }
  z-index: 1;
`;