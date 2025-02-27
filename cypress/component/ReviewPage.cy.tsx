import React from 'react';
import { mount } from 'cypress/react18';
import App from '../../src/App';

// Mock the generatePUID function to return a consistent PUID for testing
const mockPUID = 'moc-kpu-idg-ene';

describe('Review Page Component', () => {
  beforeEach(() => {
    // Stub the generatePUID function
    cy.stub(window, 'fetch').resolves({
      json: cy.stub().resolves({ data: null, error: null }),
      ok: true,
    });
    
    // Mount the component
    mount(<App />);
    
    // Fill out all forms to get to review page
    
    // Basics form
    cy.get('input[name="firstName"]').type('John');
    cy.get('input[name="lastName"]').type('Doe');
    cy.get('select[name="birthMonth"]').select('01');
    cy.get('select[name="birthDay"]').select('15');
    cy.get('select[name="birthYear"]').select('1990');
    cy.get('select[name="gender"]').select('Male');
    cy.contains('button', 'Next').click();
    
    // Personality form
    cy.contains('Analytical').click();
    cy.contains('Ambitious').click();
    cy.contains('Curious').click();
    cy.contains('Determined').click();
    cy.contains('Problem solving').click();
    cy.contains('Critical thinking').click();
    cy.contains('Work-life balance').click();
    cy.contains('Meeting deadlines').click();
    cy.contains('button', 'Next').click();
    
    // Preferences form
    cy.get('input[name="favoriteColor"]').type('Blue');
    cy.contains('Rock').click();
    cy.get('input[name="favoriteHobby"]').type('Reading');
    cy.contains('button', 'Next').click();
    
    // Experiences form
    cy.get('select[name="education"]').select("Bachelor's Degree");
    cy.get('input[name="profession"]').type('Software Engineer');
    cy.contains('English').click();
    cy.contains('button', 'Next').click();
    
    // Values form
    cy.contains('Growth').click();
    cy.contains('Knowledge').click();
    cy.contains('Innovation').click();
    cy.get('textarea[name="lifeGoal"]').type('To continuously learn and grow as a person.');
    cy.contains('button', 'Next').click();
  });

  it('displays the PUID', () => {
    cy.contains('Your Personal Identifier').should('be.visible');
    cy.get('[data-testid="puid"]').should('be.visible');
  });

  it('displays all user information sections', () => {
    cy.contains('Basic Information').should('be.visible');
    cy.contains('Personality').should('be.visible');
    cy.contains('Preferences').should('be.visible');
    cy.contains('Experiences').should('be.visible');
    cy.contains('Values').should('be.visible');
  });

  it('displays correct user information', () => {
    // Check basic info
    cy.contains('John Doe').should('be.visible');
    cy.contains('01/15/1990').should('be.visible');
    cy.contains('Male').should('be.visible');
    
    // Check personality
    cy.contains('Analytical').should('be.visible');
    cy.contains('Ambitious').should('be.visible');
    cy.contains('Problem solving').should('be.visible');
    cy.contains('Work-life balance').should('be.visible');
    
    // Check preferences
    cy.contains('Blue').should('be.visible');
    cy.contains('Rock').should('be.visible');
    cy.contains('Reading').should('be.visible');
    
    // Check experiences
    cy.contains("Bachelor's Degree").should('be.visible');
    cy.contains('Software Engineer').should('be.visible');
    cy.contains('English').should('be.visible');
    
    // Check values
    cy.contains('Growth').should('be.visible');
    cy.contains('Knowledge').should('be.visible');
    cy.contains('To continuously learn and grow as a person').should('be.visible');
  });

  it('has a regenerate button', () => {
    cy.contains('Regenerate').should('be.visible');
  });

  it('has a copy to clipboard button', () => {
    cy.get('[title="Copy to clipboard"]').should('be.visible');
  });
});