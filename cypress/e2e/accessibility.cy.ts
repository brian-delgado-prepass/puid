describe('Accessibility Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should have proper heading structure', () => {
    // Check main heading
    cy.get('h1').should('contain', 'Personal Identity Creator');
    
    // Check form section heading
    cy.get('h2').should('contain', 'Basic Information');
  });

  it('should have proper form labels', () => {
    // Check that all inputs have associated labels
    cy.get('label[for="firstName"]').should('be.visible');
    cy.get('label[for="lastName"]').should('be.visible');
    cy.get('label[for="gender"]').should('be.visible');
  });

  it('should have keyboard navigable form', () => {
    // Tab to first name input
    cy.get('body').tab();
    cy.focused().should('have.attr', 'name', 'firstName');
    
    // Tab to last name input
    cy.focused().tab();
    cy.focused().should('have.attr', 'name', 'lastName');
    
    // Continue tabbing through the form
    cy.focused().tab();
    cy.focused().should('have.attr', 'name', 'birthMonth');
  });

  it('should have visible focus states', () => {
    // Check that inputs have visible focus states
    cy.get('input[name="firstName"]').focus()
      .should('have.css', 'outline-color')
      .and('not.equal', 'rgb(255, 255, 255)'); // Not white (invisible)
  });
});