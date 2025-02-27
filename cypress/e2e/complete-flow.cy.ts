describe('Complete User Flow', () => {
  it('should navigate through all steps and generate a PUID', () => {
    cy.visit('/');
    
    // Step 1: Fill out basics form
    cy.contains('Basic Information').should('be.visible');
    cy.get('input[name="firstName"]').type('Jane');
    cy.get('input[name="lastName"]').type('Smith');
    cy.get('select[name="birthMonth"]').select('05');
    cy.get('select[name="birthDay"]').select('20');
    cy.get('select[name="birthYear"]').select('1985');
    cy.get('select[name="gender"]').select('Female');
    cy.contains('button', 'Next').click();
    
    // Step 2: Fill out personality form
    cy.contains('Personality Profile').should('be.visible');
    cy.contains('Creative').click();
    cy.contains('Intuitive').click();
    cy.contains('Empathetic').click();
    cy.contains('Optimistic').click();
    cy.contains('Creativity').click();
    cy.contains('Communication').click();
    cy.contains('Public speaking').click();
    cy.contains('Handling criticism').click();
    cy.contains('button', 'Next').click();
    
    // Step 3: Fill out preferences form
    cy.contains('Personal Preferences').should('be.visible');
    cy.get('input[name="favoriteColor"]').type('Purple');
    cy.contains('Jazz').click();
    cy.contains('Classical').click();
    cy.get('input[name="favoriteHobby"]').type('Painting');
    cy.contains('button', 'Next').click();
    
    // Step 4: Fill out experiences form
    cy.contains('Life Experiences').should('be.visible');
    cy.get('select[name="education"]').select("Master's Degree");
    cy.get('input[name="profession"]').type('Graphic Designer');
    cy.contains('English').click();
    cy.contains('French').click();
    cy.contains('button', 'Next').click();
    
    // Step 5: Fill out values form
    cy.contains('Personal Values').should('be.visible');
    cy.contains('Creativity').click();
    cy.contains('Freedom').click();
    cy.contains('Authenticity').click();
    cy.contains('Arts & culture').click();
    cy.get('textarea[name="lifeGoal"]').type('To express myself through art and inspire others.');
    cy.contains('button', 'Next').click();
    
    // Review page
    cy.contains('Your Personal Identifier').should('be.visible');
    cy.get('[data-testid="puid"]').should('be.visible');
    cy.get('[data-testid="puid"]').should('not.be.empty');
    
    // Verify all information is displayed correctly
    cy.contains('Jane Smith').should('be.visible');
    cy.contains('05/20/1985').should('be.visible');
    cy.contains('Female').should('be.visible');
    cy.contains('Creative').should('be.visible');
    cy.contains('Purple').should('be.visible');
    cy.contains('Graphic Designer').should('be.visible');
    cy.contains('Creativity').should('be.visible');
    cy.contains('To express myself through art').should('be.visible');
  });
});