Cypress.Commands.add('loginAsAdmin', () => {
    cy.visit('http://localhost:4200/auth/login');
    cy.get('input#email').type('ADMIN');
    cy.get('input#password').type('ADMIN');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/products');
});

declare global {
    namespace Cypress {
        interface Chainable {
            loginAsAdmin(): Chainable<void>;
        }
    }
}
