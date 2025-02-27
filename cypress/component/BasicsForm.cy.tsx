import React from 'react';
import { mount } from 'cypress/react18';
import App from '../../src/App';

describe('Basics Form Component', () => {
  it('renders all form fields', () => {
    mount(<App />);
    
    // Check for all form fields
    cy.get('input[name="firstName"]').should('be.visible');
    cy.get('input[name="lastName"]').should('be.visible');
    cy.get('select[name="birthMonth"]').should('be.visible');
    cy.get('select[name="birthDay"]').should('be.visible');
    cy.get('select[name="birthYear"]').should('be.visible');
    cy.get('select[name="gender"]').should('be.visible');
  });

  it('enables next button when all required fields are filled', () => {
    mount(<App />);
    
    // Fill out all required fields
    cy.get('input[name="firstName"]').type('John');
    cy.get('input[name="lastName"]').type('Doe');
    cy.get('select[name="birthMonth"]').select('01');
    cy.get('select[name="birthDay"]').select('15');
    cy.get('select[name="birthYear"]').select('1990');
    cy.get('select[name="gender"]').select('Male');
    
    // Next button should be enabled
    cy.contains('button', 'Next').should('not.be.disabled');
  });
});