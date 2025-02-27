describe('Preferences Form', () => {
  beforeEach(() => {
    cy.visit('/');
    
    // Fill out basics form
    cy.get('input[name="firstName"]').type('John');
    cy.get('input[name="lastName"]').type('Doe');
    cy.get('select[name="birthMonth"]').select('01');
    cy.get('select[name="birthDay"]').select('15');
    cy.get('select[name="birthYear"]').select('1990');
    cy.get('select[name="gender"]').select('Male');
    cy.contains('button', 'Next').click();
    
    // Fill out personality form
    cy.contains('Analytical').click();
    cy.contains('Ambitious').click();
    cy.contains('Curious').click();
    cy.contains('Determined').click();
    cy.contains('Problem solving').click();
    cy.contains('Critical thinking').click();
    cy.contains('Work-life balance').click();
    cy.contains('Meeting deadlines').click();
    cy.contains('button', 'Next').click();
  });

  it('should display all preferences form fields', () => {
    cy.contains('Personal Preferences').should('be.visible');
    cy.contains('Favorite Color').should('be.visible');
    cy.contains('Music Genres You Enjoy').should('be.visible');
    cy.contains('Favorite Hobby or Activity').should('be.visible');
  });

  it('should allow entering favorite color', () => {
    cy.get('input[name="favoriteColor"]').type('Blue');
    cy.get('input[name="favoriteColor"]').should('have.value', 'Blue');
  });

  it('should allow selecting music genres', () => {
    cy.contains('Rock').click();
    cy.contains('Jazz').click();
    
    // Verify they're selected
    cy.contains('Rock').should('have.class', 'bg-purple-100');
    cy.contains('Jazz').should('have.class', 'bg-purple-100');
  });

  it('should allow entering favorite hobby', () => {
    cy.get('input[name="favoriteHobby"]').type('Reading');
    cy.get('input[name="favoriteHobby"]').should('have.value', 'Reading');
  });

  it('should validate form completion before proceeding', () => {
    // Try to proceed without completing the form
    cy.contains('button', 'Next').click();
    
    // Should still be on the preferences form
    cy.contains('Personal Preferences').should('be.visible');
    
    // Complete the form
    cy.get('input[name="favoriteColor"]').type('Blue');
    cy.contains('Rock').click();
    cy.get('input[name="favoriteHobby"]').type('Reading');
    
    // Now should be able to proceed
    cy.contains('button', 'Next').click();
    
    // Should be on experiences form
    cy.contains('Life Experiences').should('be.visible');
  });
});