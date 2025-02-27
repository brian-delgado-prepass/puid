import React from 'react';
import { mount } from 'cypress/react18';
import App from '../../src/App';

describe('App Component', () => {
  it('renders the app title', () => {
    mount(<App />);
    cy.contains('Personal Identity Creator').should('be.visible');
  });

  it('renders the basics form initially', () => {
    mount(<App />);
    cy.contains('Basic Information').should('be.visible');
    cy.get('input[name="firstName"]').should('be.visible');
    cy.get('input[name="lastName"]').should('be.visible');
  });

  it('validates required fields', () => {
    mount(<App />);
    cy.get('button').should('be.disabled');
    
    cy.get('input[name="name"]').type('Test Name');
    cy.get('input[name="email"]').type('test@example.com');
    
    cy.get('button').should('not.be.disabled');
    cy.get('button').click();
  });

  it('allows entering basic information', () => {
    mount(<App />);
    cy.get('input[name="firstName"]').type('John');
    cy.get('input[name="lastName"]').type('Doe');
    cy.get('select[name="birthMonth"]').select('01');
    cy.get('select[name="birthDay"]').select('15');
    cy.get('select[name="birthYear"]').select('1990');
    cy.get('select[name="gender"]').select('Male');
    cy.contains('button', 'Next').should('not.be.disabled');
  });
});