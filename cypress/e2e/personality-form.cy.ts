describe('Personality Form', () => {
  beforeEach(() => {
    cy.visit('/');
    
    // Fill out basics form and navigate to personality form
    cy.get('input[name="firstName"]').type('John');
    cy.get('input[name="lastName"]').type('Doe');
    cy.get('select[name="birthMonth"]').select('01');
    cy.get('select[name="birthDay"]').select('15');
    cy.get('select[name="birthYear"]').select('1990');
    cy.get('select[name="gender"]').select('Male');
    cy.contains('button', 'Next').click();
  });

  it('should display all personality form sections', () => {
    cy.contains('Personality Profile').should('be.visible');
    cy.contains('Personality Type').should('be.visible');
    cy.contains(/Personal Traits/i).should('be.visible');
    cy.contains(/Key Strengths/i).should('be.visible');
    cy.contains(/Personal Challenges/i).should('be.visible');
  });

  it('should allow selecting personality type', () => {
    // Select personality type
    cy.contains('Analytical').click();
    
    // Verify it's selected (has different styling)
    cy.contains('Analytical').should('have.class', 'bg-indigo-100');
  });

  it('should allow selecting traits, strengths, and challenges', () => {
    // Select personality type
    cy.contains('Analytical').click();
    
    // Select traits
    cy.contains('Ambitious').click();
    cy.contains('Curious').click();
    cy.contains('Determined').click();
    
    // Verify they're selected
    cy.contains('Ambitious').should('have.class', 'bg-indigo-100');
    cy.contains('Curious').should('have.class', 'bg-indigo-100');
    cy.contains('Determined').should('have.class', 'bg-indigo-100');
    
    // Select strengths
    cy.contains('Problem solving').click();
    cy.contains('Critical thinking').click();
    
    // Verify they're selected
    cy.contains('Problem solving').should('have.class', 'bg-green-100');
    cy.contains('Critical thinking').should('have.class', 'bg-green-100');
    
    // Select challenges
    cy.contains('Work-life balance').click();
    cy.contains('Meeting deadlines').click();
    
    // Verify they're selected
    cy.contains('Work-life balance').should('have.class', 'bg-amber-100');
    cy.contains('Meeting deadlines').should('have.class', 'bg-amber-100');
  });

  it('should validate form completion before proceeding', () => {
    // Try to proceed without completing the form
    cy.contains('button', 'Next').click();
    
    // Should still be on the personality form
    cy.contains('Personality Profile').should('be.visible');
    
    // Complete the form
    cy.contains('Analytical').click();
    cy.contains('Ambitious').click();
    cy.contains('Curious').click();
    cy.contains('Determined').click();
    cy.contains('Problem solving').click();
    cy.contains('Critical thinking').click();
    cy.contains('Work-life balance').click();
    cy.contains('Meeting deadlines').click();
    
    // Now should be able to proceed
    cy.contains('button', 'Next').click();
    
    // Should be on preferences form
    cy.contains('Personal Preferences').should('be.visible');
  });
});