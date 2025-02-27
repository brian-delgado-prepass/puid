describe('Review Page', () => {
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
    
    // Fill out values form
    cy.contains('Growth').click();
    cy.contains('Knowledge').click();
    cy.contains('Innovation').click();
    cy.get('textarea[name="lifeGoal"]').type('To continuously learn and grow as a person.');
    cy.contains('button', 'Next').click();
  });

  it('should display the PUID', () => {
    cy.contains('Your Personal Identifier').should('be.visible');
    cy.get('[data-testid="puid"]').should('be.visible');
    cy.get('[data-testid="puid"]').should('not.be.empty');
  });

  it('should display all user information sections', () => {
    cy.contains('Basic Information').should('be.visible');
    cy.contains('Personality').should('be.visible');
    cy.contains('Preferences').should('be.visible');
    cy.contains('Experiences').should('be.visible');
    cy.contains('Values').should('be.visible');
  });

  it('should display correct user information', () => {
    // Check basic info
    cy.contains('John Doe').should('be.visible');
    cy.contains('01/15/1990').should('be.visible');
    cy.contains('Male').should('be.visible');
    
    // Check personality
    cy.contains('Analytical').should('be.visible');
    cy.contains('Ambitious').should('be.visible');
    cy.contains('Problem solving').should('be.visible');
    cy.contains('Work-life balance').should('be.visible');
    
    // Check preferences
    cy.contains('Blue').should('be.visible');
    cy.contains('Rock').should('be.visible');
    cy.contains('Reading').should('be.visible');
    
    // Check experiences
    cy.contains("Bachelor's Degree").should('be.visible');
    cy.contains('Software Engineer').should('be.visible');
    cy.contains('English').should('be.visible');
    
    // Check values
    cy.contains('Growth').should('be.visible');
    cy.contains('Knowledge').should('be.visible');
    cy.contains('To continuously learn and grow as a person').should('be.visible');
  });

  it('should allow regenerating the PUID', () => {
    // Get the initial PUID
    cy.get('[data-testid="puid"]').invoke('text').as('initialPuid');
    
    // Click regenerate
    cy.contains('Regenerate').click();
    
    // Verify PUID changed
    cy.get('[data-testid="puid"]').invoke('text').then((newPuid) => {
      cy.get('@initialPuid').should('not.eq', newPuid);
    });
  });

  it('should allow copying the PUID to clipboard', () => {
    // Mock the clipboard API
    cy.window().then((win) => {
      cy.stub(win.navigator.clipboard, 'writeText').resolves();
    });
    
    // Click copy button
    cy.get('[title="Copy to clipboard"]').click();
    
    // Verify clipboard API was called
    cy.window().then((win) => {
      expect(win.navigator.clipboard.writeText).to.be.calledOnce;
    });
    
    // Verify check icon appears
    cy.get('svg.h-5.w-5').should('be.visible');
  });
});