describe('Form Navigation', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the basics form initially', () => {
    cy.contains('Basic Information').should('be.visible');
    cy.contains('First Name').should('be.visible');
    cy.contains('Last Name').should('be.visible');
  });

  it('should validate required fields in basics form', () => {
    // Try to proceed without filling required fields
    cy.contains('button', 'Next').click();
    
    // Should still be on the basics form
    cy.contains('Basic Information').should('be.visible');
  });

  it('should enable next button when all required fields are filled', () => {
    // Fill out basics form
    cy.get('input[name="firstName"]').type('John');
    cy.get('input[name="lastName"]').type('Doe');
    cy.get('select[name="birthMonth"]').select('01');
    cy.get('select[name="birthDay"]').select('15');
    cy.get('select[name="birthYear"]').select('1990');
    cy.get('select[name="gender"]').select('Male');
    
    // Next button should be enabled
    cy.contains('button', 'Next').should('not.be.disabled');
  });

  it('should navigate to personality form and back', () => {
    // Fill out basics form
    cy.get('input[name="firstName"]').type('John');
    cy.get('input[name="lastName"]').type('Doe');
    cy.get('select[name="birthMonth"]').select('01');
    cy.get('select[name="birthDay"]').select('15');
    cy.get('select[name="birthYear"]').select('1990');
    cy.get('select[name="gender"]').select('Male');
    
    // Go to personality form
    cy.contains('button', 'Next').click();
    cy.contains('Personality Profile').should('be.visible');
    
    // Go back to basics
    cy.contains('button', 'Back').click();
    cy.contains('Basic Information').should('be.visible');
  });

  it('should maintain form data when navigating back and forth', () => {
    // Fill out basics form
    cy.get('input[name="firstName"]').type('John');
    cy.get('input[name="lastName"]').type('Doe');
    cy.get('select[name="birthMonth"]').select('01');
    cy.get('select[name="birthDay"]').select('15');
    cy.get('select[name="birthYear"]').select('1990');
    cy.get('select[name="gender"]').select('Male');
    
    // Go to personality form
    cy.contains('button', 'Next').click();
    
    // Go back to basics
    cy.contains('button', 'Back').click();
    
    // Check that form data is maintained
    cy.get('input[name="firstName"]').should('have.value', 'John');
    cy.get('input[name="lastName"]').should('have.value', 'Doe');
    cy.get('select[name="birthMonth"]').should('have.value', '01');
    cy.get('select[name="birthDay"]').should('have.value', '15');
    cy.get('select[name="birthYear"]').should('have.value', '1990');
    cy.get('select[name="gender"]').should('have.value', 'Male');
  });
});