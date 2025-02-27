/// <reference types="cypress" />

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  // Log to console when tests start/end
  on('before:run', (details) => {
    console.log('Running Cypress tests:', details.specs);
  });

  on('after:run', (results) => {
    console.log('Cypress test results:', {
      totalTests: results.totalTests,
      totalPassed: results.totalPassed,
      totalFailed: results.totalFailed,
      totalPending: results.totalPending,
      totalSkipped: results.totalSkipped,
    });
  });

  return config;
};