describe('Responsive Design', () => {
  const viewports = [
    { width: 375, height: 667, device: 'mobile' },
    { width: 768, height: 1024, device: 'tablet' },
    { width: 1280, height: 800, device: 'desktop' }
  ];

  viewports.forEach(viewport => {
    describe(`on ${viewport.device} (${viewport.width}x${viewport.height})`, () => {
      beforeEach(() => {
        cy.viewport(viewport.width, viewport.height);
        cy.visit('/');
      });

      it('should display the form correctly', () => {
        // Check header is visible
        cy.contains('Personal Identity Creator').should('be.visible');
        
        // Check progress bar is visible
        cy.get('.bg-gray-200.rounded-full').should('be.visible');
        
        // Check step indicators are visible
        cy.get('.flex.justify-between').first().within(() => {
          cy.get('.rounded-full').should('have.length.at.least', 5);
        });
        
        // Check form container is visible
        cy.get('.bg-white.rounded-lg').should('be.visible');
        
        // Check form elements are properly sized
        cy.get('input[name="firstName"]').should('be.visible')
          .and($el => {
            const width = $el[0].getBoundingClientRect().width;
            // Input should take up most of its container width
            expect(width).to.be.greaterThan(viewport.width * 0.3);
          });
      });

      it('should navigate through steps correctly', () => {
        // Fill out basics form
        cy.get('input[name="firstName"]').type('John');
        cy.get('input[name="lastName"]').type('Doe');
        cy.get('select[name="birthMonth"]').select('01');
        cy.get('select[name="birthDay"]').select('15');
        cy.get('select[name="birthYear"]').select('1990');
        cy.get('select[name="gender"]').select('Male');
        cy.contains('button', 'Next').click();

        // Verify personality form is displayed
        cy.contains('Personality Profile').should('be.visible');
        
        // Go back to basics
        cy.contains('button', 'Back').click();
        
        // Verify basics form is displayed again
        cy.contains('Basic Information').should('be.visible');
      });
    });
  });
});