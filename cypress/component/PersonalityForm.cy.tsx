import React from 'react';
import { mount } from 'cypress/react18';
import App from '../../src/App';

describe('Personality Form Component', () => {
  beforeEach(() => {
    mount(<App />);
    
    // Fill out basics form to get to personality form
    cy.get('input[name="firstName"]').type('John');
    cy.get('input[name="lastName"]').type('Doe');
    cy.get('select[name="birthMonth"]').select('01');
    cy.get('select[name="birthDay"]').select('15');
    cy.get('select[name="birthYear"]').select('1990');
    cy.get('select[name="gender"]').select('Male');
    cy.contains('button', 'Next').click();
  });

  it('renders all personality form sections', () => {
    cy.contains('Personality Profile').should('be.visible');
    cy.contains('Personality Type').should('be.visible');
    cy.contains(/Personal Traits/i).should('be.visible');
    cy.contains(/Key Strengths/i).should('be.visible');
    cy.contains(/Personal Challenges/i).should('be.visible');
  });

  it('allows selecting personality type', () => {
    // Select personality type
    cy.contains('Analytical').click();
    
    // Verify it's selected (has different styling)
    cy.contains('Analytical').should('have.class', 'bg-indigo-100');
  });

  it('allows selecting traits', () => {
    // Select traits
    cy.contains('Ambitious').click();
    cy.contains('Curious').click();
    cy.contains('Determined').click();
    
    // Verify they're selected
    cy.contains('Ambitious').should('have.class', 'bg-indigo-100');
    cy.contains('Curious').should('have.class', 'bg-indigo-100');
    cy.contains('Determined').should('have.class', 'bg-indigo-100');
  });

  it('allows selecting strengths', () => {
    // Select strengths
    cy.contains('Problem solving').click();
    cy.contains('Critical thinking').click();
    
    // Verify they're selected
    cy.contains('Problem solving').should('have.class', 'bg-green-100');
    cy.contains('Critical thinking').should('have.class', 'bg-green-100');
  });

  it('allows selecting challenges', () => {
    // Select challenges
    cy.contains('Work-life balance').click();
    cy.contains('Meeting deadlines').click();
    
    // Verify they're selected
    cy.contains('Work-life balance').should('have.class', 'bg-amber-100');
    cy.contains('Meeting deadlines').should('have.class', 'bg-amber-100');
  });
});