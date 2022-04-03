describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.contains('Header');
    cy.contains('Search a summoner name');
  });

  it('has the correct title', () => {
    cy.title().should('equal', 'LolTimerApp');
  });

  /*
  cy.get('[data-testid="increment-button"]').click();
  cy.get('[data-testid="count"]').should('have.text', '5');
  cy.get('[data-testid="reset-input"]').type('123');
  */
});
