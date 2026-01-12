/**
 * UI/UX Designer Skill
 * Helps design beautiful UI components following the established design system
 */

const designSystem = {
  colors: {
    primary: '#2563eb', // Blue
    secondary: '#9333ea', // Purple
    neutrals: {
      light: {
        background: '#ffffff',
        text: '#1f2937'
      },
      dark: {
        background: '#111827',
        text: '#f9fafb'
      }
    }
  },

  spacing: {
    base: 8, // px
    scale: [8, 16, 24, 32, 48, 64] // multiples of base unit
  },

  typography: {
    display: '2.5rem', // 40px - Hero titles
    h1: '2rem',       // 32px - Main section headers
    h2: '1.5rem',     // 24px - Subsection headers
    h3: '1.25rem',    // 20px - Card titles
    bodyLarge: '1.125rem', // 18px - Lead paragraphs
    bodyRegular: '1rem',   // 16px - Standard text
    bodySmall: '0.875rem'  // 14px - Captions and labels
  },

  components: {
    button: {
      primary: {
        backgroundColor: '#2563eb',
        color: '#ffffff',
        padding: '8px 16px',
        borderRadius: '4px',
        border: 'none',
        cursor: 'pointer'
      },
      secondary: {
        backgroundColor: 'transparent',
        color: '#9333ea',
        padding: '8px 16px',
        borderRadius: '4px',
        border: '1px solid #9333ea',
        cursor: 'pointer'
      }
    }
  }
};

module.exports = { designSystem };