const { chromium } = require('playwright');

(async () => {
  // Install browsers first
  console.log('Installing Playwright browsers...');
  const { execSync } = require('child_process');
  try {
    execSync('npx playwright install-deps', { stdio: 'inherit' });
    console.log('Dependencies installed successfully');
  } catch (error) {
    console.error('Error installing dependencies:', error.message);
    return;
  }

  // Define viewport sizes
  const viewports = [
    { width: 375, height: 667, name: 'mobile' },      // iPhone SE
    { width: 768, height: 1024, name: 'tablet' },     // iPad
    { width: 1280, height: 800, name: 'desktop' }     // Desktop
  ];

  // Launch browser
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // Serve the portfolio site
  const http = require('http');
  const fs = require('fs');
  const path = require('path');

  // Simple static file server
  const server = http.createServer((req, res) => {
    let filePath = req.url === '/' ? 'index.html' : req.url;
    filePath = path.join(process.cwd(), filePath);

    // Set content type based on file extension
    const extname = path.extname(filePath);
    let contentType = 'text/html';

    switch(extname) {
      case '.js':
        contentType = 'text/javascript';
        break;
      case '.css':
        contentType = 'text/css';
        break;
      case '.json':
        contentType = 'application/json';
        break;
      case '.png':
        contentType = 'image/png';
        break;
      case '.jpg':
        contentType = 'image/jpg';
        break;
      case '.gif':
        contentType = 'image/gif';
        break;
      case '.svg':
        contentType = 'image/svg+xml';
        break;
    }

    fs.readFile(filePath, (err, content) => {
      if (err) {
        if (err.code === 'ENOENT') {
          res.writeHead(404);
          res.end('404 Not Found');
        } else {
          res.writeHead(500);
          res.end(`Server Error: ${err.code}`);
        }
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content, 'utf-8');
      }
    });
  });

  // Start server on a random port
  const port = 3000;
  server.listen(port, async () => {
    console.log(`Server running on http://localhost:${port}`);

    try {
      // Navigate to the site
      await page.goto(`http://localhost:${port}`);

      // Take screenshots for each viewport
      for (const viewport of viewports) {
        console.log(`Taking screenshot for ${viewport.name} (${viewport.width}x${viewport.height})`);

        // Set viewport
        await page.setViewportSize({ width: viewport.width, height: viewport.height });

        // Wait for page to load
        await page.waitForLoadState('networkidle');

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
      await page.setViewportSize({ width: 375, height: 667 });
      await page.waitForLoadState('networkidle');

      // Try to click the mobile menu
      const mobileMenuExists = await page.$('#mobile-menu');
      if (mobileMenuExists) {
        console.log('✓ Mobile menu element found');

        // Click the mobile menu to expand it
        await page.click('#mobile-menu');
        await page.waitForTimeout(500); // Wait for animation

        // Check if menu is expanded
        const isMenuExpanded = await page.$eval('.nav-menu', el => el.classList.contains('active'));
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
        await page.waitForTimeout(500);

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
      await page.waitForTimeout(1000); // Wait for smooth scroll

      const formExists = await page.$('#contactForm');
      if (formExists) {
        console.log('✓ Contact form found');

        // Try submitting empty form to test validation
        await page.click('button[type="submit"]');
        await page.waitForTimeout(500);

        // Check if validation is triggered (alert should appear)
        page.on('dialog', dialog => {
          console.log('✓ Form validation triggered (dialog appeared)');
          dialog.dismiss().catch(() => {});
        });
      } else {
        console.log('⚠ Contact form not found');
      }

      console.log('\nAll tests completed! Check the screenshot files to review the visual appearance.');
    } catch (error) {
      console.error('Error during screenshot process:', error);
    } finally {
      await browser.close();
      server.close();
    }
  });
})();