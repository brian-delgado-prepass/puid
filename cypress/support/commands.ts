/// <reference types="cypress" />

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })

// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })

// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })

// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Add tab command for accessibility testing
Cypress.Commands.add('tab', { prevSubject: 'optional' }, (subject) => {
  const tabEvent = {
    key: 'Tab',
    code: 'Tab',
    which: 9,
    keyCode: 9,
    bubbles: true
  };
  
  if (subject) {
    cy.wrap(subject).trigger('keydown', tabEvent);
  } else {
    cy.focused().trigger('keydown', tabEvent);
  }
  
  return cy.document().trigger('keyup', tabEvent);
});

export {};

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to simulate pressing the Tab key
       * @example cy.tab()
       */
      tab(options?: Partial<TypeOptions>): Chainable<Element>;
    }
  }
}