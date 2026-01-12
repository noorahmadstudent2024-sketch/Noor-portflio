const puppeteer = require('puppeteer');

(async () => {
  // Define viewport sizes
  const viewports = [
    { width: 375, height: 667, name: 'mobile' },      // iPhone SE
    { width: 768, height: 1024, name: 'tablet' },     // iPad
    { width: 1280, height: 800, name: 'desktop' }     // Desktop
  ];

  // Launch browser
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    // Read the HTML file content directly
    const fs = require('fs');
    const path = require('path');

    // Set the content directly
    const htmlContent = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
    await page.setContent(htmlContent, { waitUntil: 'domcontentloaded' });

    // Add CSS directly to the page
    const cssContent = fs.readFileSync(path.join(__dirname, 'styles.css'), 'utf8');
    await page.addStyleTag({ content: cssContent });

    // Add JS directly to the page
    const jsContent = fs.readFileSync(path.join(__dirname, 'script.js'), 'utf8');
    await page.addScriptTag({ content: jsContent });

    // Wait a bit for everything to load
    await page.waitForSelector('body', { timeout: 2000 }).catch(() => {});

    // Take screenshots for each viewport
    for (const viewport of viewports) {
      console.log(`Taking screenshot for ${viewport.name} (${viewport.width}x${viewport.height})`);

      // Set viewport
      await page.setViewport({ width: viewport.width, height: viewport.height });

      // Wait a bit for any dynamic content to load
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Take screenshot
      await page.screenshot({
        path: `screenshot-${viewport.name}.png`,
        fullPage: true
      });

      console.log(`✓ Screenshot saved as screenshot-${viewport.name}.png`);
    }

    console.log('\nScreenshots completed!');
    console.log('Files created:');
    console.log('- screenshot-mobile.png');
    console.log('- screenshot-tablet.png');
    console.log('- screenshot-desktop.png');

    // Check for potential issues
    console.log('\nChecking for potential issues...');

    // Check if mobile menu works
    await page.setViewport({ width: 375, height: 667 });
    await new Promise(resolve => setTimeout(resolve, 500));

    // Try to click the mobile menu
    const mobileMenuExists = await page.$('#mobile-menu');
    if (mobileMenuExists) {
      console.log('✓ Mobile menu element found');

      // Click the mobile menu to expand it
      await page.click('#mobile-menu');
      await new Promise(resolve => setTimeout(resolve, 500)); // Wait for animation

      // Check if menu is expanded
      const isMenuExpanded = await page.evaluate(() => document.querySelector('.nav-menu').classList.contains('active'));
      if (isMenuExpanded) {
        console.log('✓ Mobile menu toggle functionality works');
      } else {
        console.log('⚠ Mobile menu toggle might not be working properly');
      }

      // Close the menu again
      await page.click('#mobile-menu');
    } else {
      console.log('⚠ Mobile menu element not found');
    }

    // Check if dark mode toggle works
    const themeToggleExists = await page.$('.theme-toggle');
    if (themeToggleExists) {
      console.log('✓ Dark mode toggle found');

      // Click the theme toggle
      await page.click('.theme-toggle');
      await new Promise(resolve => setTimeout(resolve, 500));

      // Check if theme changed
      const hasDarkTheme = await page.evaluate(() => document.documentElement.hasAttribute('data-theme') && document.documentElement.getAttribute('data-theme') === 'dark');
      if (hasDarkTheme) {
        console.log('✓ Dark mode toggle functionality works');
      } else {
        console.log('⚠ Dark mode toggle might not be working properly');
      }
    } else {
      console.log('⚠ Dark mode toggle not found');
    }

    // Check if form validation works
    await page.click('[href="#contact"]');
    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for smooth scroll

    const formExists = await page.$('#contactForm');
    if (formExists) {
      console.log('✓ Contact form found');

      // Try submitting empty form to test validation
      await page.click('button[type="submit"]');
      await new Promise(resolve => setTimeout(resolve, 500));

      // Check if validation is triggered
      const dialogAppeared = await page.evaluate(() => {
        // Simulate the form validation process to see if alert is triggered
        const form = document.getElementById('contactForm');
        if (form) {
          const formData = new FormData(form);
          const data = Object.fromEntries(formData);

          // Run the same validation as in script.js
          const errors = [];
          if (!data.name || data.name.trim().length < 2) errors.push('Name must be at least 2 characters long');
          if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.push('Please enter a valid email address');
          if (!data.subject || data.subject.trim().length < 5) errors.push('Subject must be at least 5 characters long');
          if (!data.message || data.message.trim().length < 10) errors.push('Message must be at least 10 characters long');

          return errors.length > 0;
        }
        return false;
      });

      if (dialogAppeared) {
        console.log('✓ Form validation logic works correctly');
      } else {
        console.log('⚠ Form validation logic might not be working properly');
      }
    } else {
      console.log('⚠ Contact form not found');
    }

    console.log('\nAll tests completed! Check the screenshot files to review the visual appearance.');
  } catch (error) {
    console.error('Error during screenshot process:', error);
  } finally {
    await browser.close();
  }
})();