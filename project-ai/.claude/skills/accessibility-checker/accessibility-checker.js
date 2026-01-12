/**
 * Accessibility Checker Skill
 * Provides accessibility checking for portfolio website
 */

const accessibilityStandards = {
  wcagLevels: {
    A: "Basic accessibility requirements",
    AA: "Standard level for most sites",
    AAA: "Enhanced accessibility"
  },

  colorContrast: {
    minimumRatios: {
      normalText: 4.5,
      largeText: 3.0,
      graphics: 3.0
    },
    tools: ["contrast-ratio calculator", "color-checker"]
  },

  semanticHtml: [
    "Use proper heading hierarchy (H1, H2, H3...)",
    "Use semantic elements (nav, main, article, section)",
    "Use appropriate landmark roles"
  ],

  forms: {
    labels: "Every form control needs a label",
    errors: "Provide clear error identification and instructions",
    focus: "Manage focus appropriately during interactions"
  },

  images: {
    altText: "Provide descriptive alt text for informative images",
    decorative: "Use empty alt attribute for decorative images",
    complex: "Provide both alt text and detailed description for complex images"
  },

  keyboard: {
    trap: "No keyboard traps",
    focusIndicator: "Visible focus indicator",
    logicalOrder: "Logical tab order"
  },

  ariainputs: [
    "aria-label",
    "aria-labelledby",
    "aria-describedby",
    "aria-hidden",
    "role attributes"
  ],

  commonIssues: [
    "Missing alt text",
    "Insufficient color contrast",
    "Empty links",
    "Missing form labels",
    "Poor heading structure",
    "Missing focus indicators",
    "Empty buttons",
    "Incorrect heading levels"
  ]
};

module.exports = { accessibilityStandards };