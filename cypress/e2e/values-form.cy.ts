describe('Values Form', () => {
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
    
    // Fill out preferences form
    cy.get('input[name="favoriteColor"]').type('Blue');
    cy.contains('Rock').click();
    cy.get('input[name="favoriteHobby"]').type('Reading');
    cy.contains('button', 'Next').click();
    
    // Fill out experiences form
    cy.get('select[name="education"]').select("Bachelor's Degree");
    cy.get('input[name="profession"]').type('Software Engineer');
    cy.contains('English').click();
    cy.contains('button', 'Next').click();
  });

  it('should display all values form fields', () => {
    cy.contains('Personal Values').should('be.visible');
    cy.contains('Core Values').should('be.visible');
    cy.contains('Causes You Care About').should('be.visible');
    cy.contains('What is your primary life goal or purpose?').should('be.visible');
  });

  it('should allow selecting core values', () => {
    cy.contains('Growth').click();
    cy.contains('Knowledge').click();
    cy.contains('Innovation').click();
    
    // Verify they're selected
    cy.contains('Growth').should('have.class', 'bg-teal-100');
    cy.contains('Knowledge').should('have.class', 'bg-teal-100');
    cy.contains('Innovation').should('have.class', 'bg-teal-100');
  });

  it('should allow selecting causes (optional)', () => {
    cy.contains('Education').click();
    cy.contains('Climate change').click();
    
    // Verify they're selected
    cy.contains('Education').should('have.class', 'bg-rose-100');
    cy.contains('Climate change').should('have.class', 'bg-rose-100');
  });

  it('should allow entering life goal', () => {
    cy.get('textarea[name="lifeGoal"]').type('To continuously learn and grow as a person while making a positive impact on the world.');
    cy.get('textarea[name="lifeGoal"]').should('have.value', 'To continuously learn and grow as a person while making a positive impact on the world.');
  });

  it('should validate form completion before proceeding', () => {
    // Try to proceed without completing the form
    cy.contains('button', 'Next').click();
    
    // Should still be on the values form
    cy.contains('Personal Values').should('be.visible');
    
    // Complete the form
    cy.contains('Growth').click();
    cy.contains('Knowledge').click();
    cy.contains('Innovation').click();
    cy.get('textarea[name="lifeGoal"]').type('To continuously learn and grow as a person.');
    
    // Now should be able to proceed
    cy.contains('button', 'Next').click();
    
    // Should be on review page
    cy.contains('Your Personal Identifier').should('be.visible');
  });
});