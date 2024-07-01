describe('Promo Codes Tests', () => {
  const baseUrl = 'http://localhost:4200'; // Adjust the base URL if needed

  beforeEach(() => {
    cy.loginAsAdmin(); // Ensure the user is logged in before each test
  });

  it('Creates a new percentage-based promo code', () => {
    cy.visit(`${baseUrl}/promo-codes`);

    // Click the button to switch to percentage discount promo code form
    cy.contains('button', 'Create Percentage Discount Promo Code').click();

    // Fill out the promo code form
    cy.get('input#code').type('NEWCODE');
    cy.get('input#discount').type('15'); // Assuming 15% discount
    cy.get('input#minPurchase').type('50'); // Optional: minimum purchase amount
    cy.get('input#expiryDate').type('2024-12-31');

    // Submit the promo code form
    cy.contains('button', 'Create Promocode').click();

    cy.get('.active-promo-codes').within(() => {
      cy.contains('li', 'NEWCODE')
          .should('be.visible');
    });
  });

  it('Creates a new fixed amount promo code', () => {
    cy.visit(`${baseUrl}/promo-codes`);

    // Click the button to switch to fixed amount discount promo code form
    cy.contains('button', 'Create Amount Discount Promo Code').click();

    // Fill out the promo code form
    cy.get('input#code').type('NEWCODE');
    cy.get('input#amount').type('10'); // Assuming $10 discount
    cy.get('input#minPurchase').type('50'); // Optional: minimum purchase amount
    cy.get('input#expiryDate').type('2024-12-31');

    // Submit the promo code form
    cy.contains('button', 'Create Promocode').click();

    cy.get('.active-promo-codes').within(() => {
      cy.contains('li', 'NEWCODE')
          .should('be.visible');
    });
  });

  it('Delete an active promo code', () => {
    cy.visit(`${baseUrl}/promo-codes`);

    // Click the button to deactivate a promo code
    cy.contains('button', 'Delete').click();

    cy.get('.active-promo-codes').within(() => {
      cy.contains('li', 'NEWCODE')
          .should('not.exist');
    });
  });
});
