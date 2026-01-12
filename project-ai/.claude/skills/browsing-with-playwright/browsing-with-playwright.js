/**
 * Browsing with Playwright Skill
 * Provides automated web browsing and testing with Playwright
 */

const playwright = require('playwright');

const playwrightCapabilities = {
  browsers: ['chromium', 'firefox', 'webkit'],

  actions: {
    navigation: [
      'goto(url)',
      'goBack()',
      'goForward()',
      'reload()'
    ],
    elementInteraction: [
      'click(selector)',
      'fill(selector, text)',
      'check(selector)',
      'uncheck(selector)',
      'selectOption(selector, value)',
      'type(selector, text)',
      'press(selector, key)'
    ],
    contentExtraction: [
      'textContent(selector)',
      'innerText(selector)',
      'innerHTML(selector)',
      'getAttribute(selector, name)',
      'screenshot(options)',
      'pdf(options)'
    ],
    waiting: [
      'waitForSelector(selector)',
      'waitForTimeout(timeout)',
      'waitForLoadState(state)',
      'waitForNavigation()',
      'waitForFunction()'
    ],
    evaluation: [
      'evaluate(pageFunction)',
      '$(selector)',
      '$$(selector)',
      'addScriptTag(options)',
      'addStyleTag(options)'
    ]
  },

  selectors: {
    text: 'text="button text"',
    css: 'css=div.class-name',
    xpath: 'xpath=//div[@id="example"]',
    role: 'role=button',
    testId: 'data-testid=component'
  },

  options: {
    launch: {
      headless: true,
      slowMo: 50,
      devtools: false
    },
    context: {
      viewport: { width: 1280, height: 720 },
      userAgent: 'Mozilla/5.0 (compatible; PortfolioBot/1.0)',
      locale: 'en-US',
      timezoneId: 'America/New_York'
    }
  },

  commonTasks: {
    formSubmission: async (page, formData) => {
      for (const [field, value] of Object.entries(formData)) {
        await page.fill(`[name="${field}"]`, value);
      }
      await page.click('button[type="submit"]');
      await page.waitForLoadState('networkidle');
    },

    screenshotElement: async (page, selector, path) => {
      const element = await page.$(selector);
      if (element) {
        await element.screenshot({ path });
      }
    },

    checkAccessibility: async (page) => {
      // Run accessibility checks
      const axeSource = await import('axe-core').then(axe => axe.default.source);
      await page.addScriptTag({ content: axeSource });
      const results = await page.evaluate(() => {
        return new Promise((resolve) => {
          window.axe.run(document, (err, results) => {
            if (err) {
              resolve({ error: err.message });
            } else {
              resolve(results);
            }
          });
        });
      });
      return results;
    }
  }
};

module.exports = { playwrightCapabilities };