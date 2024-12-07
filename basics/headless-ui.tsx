/**
 * What is a Headless Browser?
 * A headless browser is a web browser without a graphical user interface
 * (GUI) that can be controlled programmatically.
 * It runs in the background and provides all the capabilities of a
 * regular browser but through command-line interfaces or code.
 */

// 1. Automated Testing
interface TestConfig {
  url: string;
  selectors: string[];
}

const runAutomatedTest = async (props: TestConfig) => {
  const { url, selectors } = props;

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url);

  console.log("test_url", url);
  console.log("test_selectors", selectors);
};

// 2. Web Scraping
interface ScraperConfig {
  targetUrl: string;
  dataSelectors: Record<string, string>;
}

const scrapeWebsite = async (props: ScraperConfig) => {
  const { targetUrl, dataSelectors } = props;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(targetUrl);

  console.log("scraping_url", targetUrl);
  console.log("data_selectors", dataSelectors);
};

/**
 * Popular Headless Browser Solutions
 * 1. Puppeteer
 * Chrome's official Node.js automation library
 * Provides high-level API
 * Great for screenshots, PDF generation, and automation
 2. Playwright
 * Cross-browser automation
 * Supports Chrome, Firefox, and Safari
 * Modern architecture with better performance
3. Selenium
 * Traditional automation framework
 * Supports multiple browsers
 * Extensive ecosystem
 */
