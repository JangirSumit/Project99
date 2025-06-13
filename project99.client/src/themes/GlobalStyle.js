// src/styles/theme.js
import { createGlobalStyle } from 'styled-components';

// Global theme variables + responsive overrides
export const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  :root {
    /* Base colors & spacing */
    --bg-secondary: #FFFFFF;
    --border: rgba(0,0,0,0.1);
    --accent-highlight: #888888;
    --font-heading: 'Spectral', serif;
    --font-body: 'Inter', sans-serif;
    --space-sm: 8px;
    --space-md: 12px;
    --space-lg: 24px;
    --radius-md: 12px;

    /* Desktop gradient stops */
    --gradient-start: #EEE;
    --gradient-mid1: #DDD;
    --gradient-mid2: #CCC;
    --gradient-mid3: #BBB;
    --gradient-end: #AAA;

    /* Mobile gradient stops */
    --gradient-mobile-start: #FFFFFF;
    --gradient-mobile-mid: #F5F5F5;
    --gradient-mobile-end: #EEEEEE;
  }

  [data-theme="dark"] {
    --bg-secondary: #1A1A1A;
    --border: rgba(255,255,255,0.1);
    --accent-highlight: #BBBBBB;

    /* Dark desktop gradients */
    --gradient-start: #333333;
    --gradient-mid1: #444444;
    --gradient-mid2: #555555;
    --gradient-mid3: #666666;
    --gradient-end: #777777;

    /* Dark mobile gradients */
    --gradient-mobile-start: #222222;
    --gradient-mobile-mid: #333333;
    --gradient-mobile-end: #444444;
  }

  select {
  font-family: var(--font-body);
  font-size: 1rem;
  padding: var(--space-sm) var(--space-md);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background: var(--bg-secondary);
  appearance: none;
  outline: none;
  background-image: url("data:image/svg+xml;utf8,<svg fill='none' stroke='%23888888' stroke-width='2' viewBox='0 0 24 24'><path d='M6 9l6 6 6-6'/></svg>");
  background-repeat: no-repeat;
  background-position: right var(--space-sm) center;
  background-size: 1em;
}

select:focus {
  border-color: var(--accent-highlight);
  box-shadow: 0 0 0 3px rgba(136,136,136,0.2);
}


  /* Mobile overrides: switch to vertical gradient & tighter spacing */
  @media (max-width: 767px) {
    :root {
      /* Apply mobile stops into the same vars for simpler backgrounds */
      --gradient-start: var(--gradient-mobile-start);
      --gradient-mid1: var(--gradient-mobile-mid);
      --gradient-mid2: var(--gradient-mobile-mid);
      --gradient-mid3: var(--gradient-mobile-mid);
      --gradient-end: var(--gradient-mobile-end);
      /* Reduce large spacing on mobile */
      --space-lg: 16px;
    }
  }
`;

// Optional JS theme for ThemeProvider
export const theme = {
    colors: {
        backgroundSecondary: 'var(--bg-secondary)',
        border: 'var(--border)',
        accentHighlight: 'var(--accent-highlight)',
        gradientStart: 'var(--gradient-start)',
        gradientMid1: 'var(--gradient-mid1)',
        gradientMid2: 'var(--gradient-mid2)',
        gradientMid3: 'var(--gradient-mid3)',
        gradientEnd: 'var(--gradient-end)',
    },
    fonts: {
        heading: 'var(--font-heading)',
        body: 'var(--font-body)',
    },
    spacing: {
        sm: 'var(--space-sm)',
        md: 'var(--space-md)',
        lg: 'var(--space-lg)',
    },
    radii: {
        md: 'var(--radius-md)',
    },
};
