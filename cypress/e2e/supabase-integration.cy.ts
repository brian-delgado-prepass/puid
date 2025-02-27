describe('Supabase Integration', () => {
  beforeEach(() => {
    cy.visit('/');
    
    // Intercept Supabase API calls
    cy.intercept('POST', '**/rest/v1/personal_identities').as('saveIdentity');
  });

  it('should save personal identity to Supabase', () => {
    // Fill out all forms quickly
    cy.get('input[name="firstName"]').type('Test');
    cy.get('input[name="lastName"]').type('User');
    cy.get('select[name="birthMonth"]').select('06');
    cy.get('select[name="birthDay"]').select('15');
    cy.get('select[name="birthYear"]').select('1995');
    cy.get('select[name="gender"]').select('Non-binary');
    cy.contains('button', 'Next').click();

    cy.contains('Practical').click();
    cy.contains('Reliable').click();
    cy.contains('Logical').click();
    cy.contains('Adaptability').click();
    cy.contains('Technical skills').click();
    cy.contains('Delegation').click();
    cy.contains('Networking').click();
    cy.contains('button', 'Next').click();

    cy.get('input[name="favoriteColor"]').type('Green');
    cy.contains('Electronic').click();
    cy.get('input[name="favoriteHobby"]').type('Coding');
    cy.contains('button', 'Next').click();

    cy.get('select[name="education"]').select("Doctorate");
    cy.get('input[name="profession"]').type('Researcher');
    cy.contains('German').click();
    cy.contains('Japanese').click();
    cy.contains('button', 'Next').click();

    cy.contains('Innovation').click();
    cy.contains('Knowledge').click();
    cy.contains('Excellence').click();
    cy.get('textarea[name="lifeGoal"]').type('To advance human knowledge');
    cy.contains('button', 'Next').click();

    // Verify API call to Supabase
    cy.wait('@saveIdentity').then((interception) => {
      // Check that the request was made with the correct data
      expect(interception.request.body).to.have.property('first_name', 'Test');
      expect(interception.request.body).to.have.property('last_name', 'User');
      expect(interception.request.body).to.have.property('birth_year', '1995');
      expect(interception.request.body).to.have.property('personality_type', 'Practical');
      expect(interception.request.body).to.have.property('favorite_color', 'Green');
      expect(interception.request.body).to.have.property('profession', 'Researcher');
      expect(interception.request.body).to.have.property('core_values').that.includes('Innovation');
    });

    // Verify PUID is displayed
    cy.get('[data-testid="puid"]').should('be.visible');
  });
});