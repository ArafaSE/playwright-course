// Read from default ".env" file.
require('dotenv').config();
const config = {
  // Look for test files in the given directory, relative to this configuration file
  testDir: 'pom',
  // Each test is given 30 seconds
  timeout: 30000,
  use: {
    baseURL: 'https://automationexercise.com',
    browserName: 'chromium',
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'only-on-failure',
    launchOptions: {
      slowMo: 50,
    },
  },
  projects: [
    {name: 'chromium'},
    {name: 'firefox'},
    {name: 'webkit'},
  ],
  // Two retries for each test
  retries: 2,
  // Limit the number of workers on CI, use default locally
  workers: process.env.CI ? 2 : undefined,
  // 'github' for GitHub Actions CI to generate annotations, plus a concise 'dot'
  // 'html' when running locally
  reporter: process.env.CI ? 'github' : 'html',
};

module.exports = config;