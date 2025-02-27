// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your component test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Import React mount command
import { mount } from 'cypress/react18';

// Add the mount command
Cypress.Commands.add('mount', mount);

// Log test names to console for CI debugging
Cypress.on('test:before:run', (attributes) => {
  console.log(`Running: ${attributes.title}`);
});

// Log test results for CI debugging
Cypress.on('test:after:run', (attributes) => {
  console.log(`Completed: ${attributes.title} (${attributes.state})`);
});

// Automatically import the global styles
import '../../src/index.css';