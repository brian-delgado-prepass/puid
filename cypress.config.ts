// @ts-check
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: '7ma5co',
  e2e: {
    baseUrl: 'http://localhost:5173',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return config;
    },
    // Enable recording
    video: true,
    videoCompression: 32,
    screenshotOnRunFailure: true,
    // Enable recording to Cypress Cloud
    record: true
  },
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
    // Enable recording
    video: true,
    videoCompression: 32,
    screenshotOnRunFailure: true,
    // Enable recording to Cypress Cloud
    record: true
  },
  // Configure retries for more stable CI runs
  retries: {
    runMode: 2,
    openMode: 0,
  }
});