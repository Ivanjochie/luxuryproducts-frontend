describe('Authentication Tests', () => {
  const baseUrl = 'http://localhost:4200'; // Adjust the base URL if needed

  it('Registers a new user', () => {
    cy.visit(`${baseUrl}/auth/register`);

    // Fill out registration form
    cy.get('input#email').type('newuser@example.com');
    cy.get('input#password1').type('PaSsword123!!@@!!1123');
    cy.get('input#password2').type('PaSsword123!!@@!!1123');

    // Submit the registration form
    cy.get('button[type="submit"]').click();

    // Verify registration success by checking URL redirection
    cy.url().should('include', '/products');
  });

  it('Logs out a user', () => {
    cy.visit('http://localhost:4200/logout');

    // // Check that the logout message is visible
    // cy.contains('header', 'You are logged out.').should('be.visible');
  });

  it('Logs in a user', () => {
    cy.visit(`${baseUrl}/auth/login`);

    // Fill out login form
    cy.get('input#email').type('newuser@example.com');
    cy.get('input#password').type('PaSsword123!!@@!!1123');

    // Submit the login form
    cy.get('button[type="submit"]').click();

    // Verify login success
    // Verify registration success by checking URL redirection
    cy.url().should('include', '/products');
  });


});
