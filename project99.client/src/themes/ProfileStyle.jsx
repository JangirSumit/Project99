import styled from 'styled-components';
import { theme } from './GlobalStyle';

const mobile = '@media (max-width: 767px)';

export const Page = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
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
  background: var(--bg-secondary);
  border-radius: ${theme.radii.md};
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 400px;
  padding: ${theme.spacing.lg};
  text-align: center;
  z-index: 1;

  ${mobile} {
    padding: ${theme.spacing.md};
  }
`;

export const Avatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: ${theme.spacing.md};
  border: 2px solid ${theme.colors.border};
`;

export const Name = styled.h4`
  font-family: ${theme.fonts.heading};
  margin: 0;
  margin-bottom: ${theme.spacing.sm};
`;

export const Username = styled.p`
  font-family: ${theme.fonts.body};
  color: #666;
  margin: 0;
  margin-bottom: ${theme.spacing.md};
`;

export const RoleBadge = styled.span`
  display: inline-block;
  background: linear-gradient(45deg, #555555, #777777);
  color: #fff;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.radii.md};
  font-size: 0.9rem;
`;

export const Form = styled.form`
  margin-top: ${theme.spacing.lg};
`;

export const Field = styled.div`
  margin-bottom: ${theme.spacing.md};
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radii.md};
  font-family: ${theme.fonts.body};
  font-size: 1rem;
  outline: none;

  &:focus {
    border-color: ${theme.colors.accentHighlight};
    box-shadow: 0 0 0 3px rgba(136,136,136,0.2);
  }
`;

export const Alert = styled.div`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background: ${props => props.type === 'success' ? '#d4edda' : '#f8d7da'};
  color: ${props => props.type === 'success' ? '#155724' : '#721c24'};
  border: 1px solid ${props => props.type === 'success' ? '#c3e6cb' : '#f5c6cb'};
  border-radius: ${theme.radii.md};
  margin-bottom: ${theme.spacing.md};
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  font-family: ${theme.fonts.body};
  font-size: 1rem;
  color: #FFFFFF;
  background: linear-gradient(45deg, #28a745, #218838);
  border: none;
  border-radius: ${theme.radii.md};
  cursor: pointer;
  transition: transform 0.1s ease;

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
  &:hover { transform: scale(1.02); }
`;