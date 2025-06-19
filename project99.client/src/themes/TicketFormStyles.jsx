import styled from 'styled-components';
import { theme } from './GlobalStyle';

const mobile = '@media (max-width: 767px)';

export const FormWrapper = styled.div`
  height: 91vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: ${theme.spacing.lg};
  overflow: auto;
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
  max-width: 600px;
  padding: ${theme.spacing.lg};
  z-index: 1;
  overflow: auto;

  ${mobile} {
    padding: ${theme.spacing.md};
  }
`;

export const Field = styled.div`
  margin-bottom: ${theme.spacing.md};
`;

export const Label = styled.label`
  display: block;
  margin-bottom: ${theme.spacing.sm};
  font-family: ${theme.fonts.body};
  font-weight: 500;
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

export const ProductsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

export const ProductRow = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};

  ${mobile} {
    flex-direction: column;
  }
`;

export const StyledSelect = styled.div`
  margin-bottom: ${theme.spacing.md};

  .react-select__control {
    min-height: 40px;
    font-family: ${theme.fonts.body};
  }
`;

export const Row = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.md};

  ${mobile} {
    flex-direction: column;
  }
`;

export const StyledButton = styled.button`
  width: 100%;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  font-family: ${theme.fonts.body};
  font-size: 1rem;
  color: #FFFFFF;
  background: linear-gradient(45deg, #555555, #777777);
  border: none;
  border-radius: ${theme.radii.md};
  cursor: pointer;
  transition: transform 0.1s ease;

  &:hover { transform: scale(1.02); }
`;
