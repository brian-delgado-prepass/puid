describe('Personal Identity Creator', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the basics form initially', () => {
    cy.contains('Basic Information').should('be.visible');
    cy.contains('First Name').should('be.visible');
    cy.contains('Last Name').should('be.visible');
  });

  it('should navigate through all steps', () => {
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
    
    // Select personality type
    cy.contains('Analytical').click();
    
    // Select traits
    cy.contains('Ambitious').click();
    cy.contains('Curious').click();
    cy.contains('Determined').click();
    
    // Select strengths
    cy.contains('Problem solving').click();
    cy.contains('Critical thinking').click();
    
    // Select challenges
    cy.contains('Work-life balance').click();
    cy.contains('Meeting deadlines').click();
    
    cy.contains('button', 'Next').click();

    // Verify preferences form is displayed
    cy.contains('Personal Preferences').should('be.visible');
    
    // Fill out preferences
    cy.get('input[name="favoriteColor"]').type('Blue');
    cy.contains('Rock').click();
    cy.contains('Jazz').click();
    cy.get('input[name="favoriteHobby"]').type('Reading');
    
    cy.contains('button', 'Next').click();

    // Verify experiences form is displayed
    cy.contains('Life Experiences').should('be.visible');
    
    // Fill out experiences
    cy.get('select[name="education"]').select("Bachelor's Degree");
    cy.get('input[name="profession"]').type('Software Engineer');
    cy.contains('English').click();
    
    cy.contains('button', 'Next').click();

    // Verify values form is displayed
    cy.contains('Personal Values').should('be.visible');
    
    // Select values
    cy.contains('Growth').click();
    cy.contains('Knowledge').click();
    cy.get('textarea[name="lifeGoal"]').type('To continuously learn and grow');
    
    cy.contains('button', 'Next').click();

    // Verify review page is displayed
    cy.contains('Your Personal Identifier').should('be.visible');
    cy.get('[data-testid="puid"]').should('be.visible');
  });

  it('should validate required fields', () => {
    // Try to proceed without filling required fields
    cy.contains('button', 'Next').click();
    
    // Should still be on the basics form
    cy.contains('Basic Information').should('be.visible');
  });

  it('should allow regenerating PUID', () => {
    // Fill out all forms quickly to get to the review page
    cy.get('input[name="firstName"]').type('Jane');
    cy.get('input[name="lastName"]').type('Smith');
    cy.get('select[name="birthMonth"]').select('05');
    cy.get('select[name="birthDay"]').select('20');
    cy.get('select[name="birthYear"]').select('1985');
    cy.get('select[name="gender"]').select('Female');
    cy.contains('button', 'Next').click();

    cy.contains('Creative').click();
    cy.contains('Intuitive').click();
    cy.contains('Creativity').click();
    cy.contains('Public speaking').click();
    cy.contains('button', 'Next').click();

    cy.get('input[name="favoriteColor"]').type('Purple');
    cy.contains('Pop').click();
    cy.get('input[name="favoriteHobby"]').type('Painting');
    cy.contains('button', 'Next').click();

    cy.get('select[name="education"]').select("Master's Degree");
    cy.get('input[name="profession"]').type('Designer');
    cy.contains('French').click();
    cy.contains('button', 'Next').click();

    cy.contains('Creativity').click();
    cy.get('textarea[name="lifeGoal"]').type('To express myself through art');
    cy.contains('button', 'Next').click();

    // Get the initial PUID
    cy.get('[data-testid="puid"]').invoke('text').as('initialPuid');
    
    // Click regenerate
    cy.contains('button', 'Regenerate').click();
    
    // Verify PUID changed
    cy.get('[data-testid="puid"]').invoke('text').then((newPuid) => {
      cy.get('@initialPuid').should('not.eq', newPuid);
    });
  });
});