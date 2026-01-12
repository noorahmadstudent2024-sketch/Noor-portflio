/**
 * SEO Optimizer Skill
 * Provides SEO optimization assistance for portfolio website
 */

const seoGuidelines = {
  metaTags: {
    title: {
      maxLength: 60,
      recommendation: "Include primary keywords and brand name"
    },
    description: {
      maxLength: 160,
      recommendation: "Compelling description that encourages clicks"
    },
    keywords: {
      recommendation: "Focus on relevant, specific keywords"
    }
  },

  contentStructure: {
    headers: {
      h1: "One per page, include primary keyword",
      h2h3: "Structure content hierarchically with relevant keywords"
    },
    keywordDensity: "2-3% for primary keywords",
    contentLength: "Minimum 300 words for effective ranking"
  },

  technicalSeo: {
    pageSpeed: "Optimize images and minify CSS/JS",
    mobileFriendly: "Ensure responsive design",
    secureConnection: "Use HTTPS protocol",
    crawlability: "Create and maintain sitemap.xml"
  },

  accessibility: {
    altTags: "Descriptive alt text for all images",
    semanticHtml: "Use proper heading structure and semantic elements",
    ariaLabels: "Add ARIA attributes where necessary"
  },

  schemaMarkup: [
    "Organization",
    "Person",
    "CreativeWork",
    "LocalBusiness"
  ],

  internalLinking: {
    depth: "Maximum 3 clicks from homepage",
    anchorText: "Use descriptive, keyword-rich anchor text"
  }
};

module.exports = { seoGuidelines };