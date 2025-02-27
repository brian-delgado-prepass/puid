describe('Experiences Form', () => {
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
  });

  it('should display all experiences form fields', () => {
    cy.contains('Life Experiences').should('be.visible');
    cy.contains('Highest Level of Education').should('be.visible');
    cy.contains('Current Profession or Field').should('be.visible');
    cy.contains('Languages You Speak').should('be.visible');
  });

  it('should allow selecting education level', () => {
    cy.get('select[name="education"]').select("Bachelor's Degree");
    cy.get('select[name="education"]').should('have.value', "Bachelor's Degree");
  });

  it('should allow entering profession', () => {
    cy.get('input[name="profession"]').type('Software Engineer');
    cy.get('input[name="profession"]').should('have.value', 'Software Engineer');
  });

  it('should allow selecting languages', () => {
    cy.contains('English').click();
    cy.contains('Spanish').click();
    
    // Verify they're selected
    cy.contains('English').should('have.class', 'bg-blue-100');
    cy.contains('Spanish').should('have.class', 'bg-blue-100');
  });

  it('should validate form completion before proceeding', () => {
    // Try to proceed without completing the form
    cy.contains('button', 'Next').click();
    
    // Should still be on the experiences form
    cy.contains('Life Experiences').should('be.visible');
    
    // Complete the form
    cy.get('select[name="education"]').select("Bachelor's Degree");
    cy.get('input[name="profession"]').type('Software Engineer');
    cy.contains('English').click();
    
    // Now should be able to proceed
    cy.contains('button', 'Next').click();
    
    // Should be on values form
    cy.contains('Personal Values').should('be.visible');
  });
});