import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: '7ma5co',
  e2e: {
    baseUrl: 'http://localhost:5173',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    // Disable video and screenshots to avoid Xvfb dependency
    video: false,
    screenshotOnRunFailure: false,
  },
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
    // Disable video and screenshots to avoid Xvfb dependency
    video: false,
    screenshotOnRunFailure: false,
  },
  // Configure retries for more stable CI runs
  retries: {
    runMode: 2,
    openMode: 0,
  },
  // Remove browser configuration to use default
  browsers: []
});