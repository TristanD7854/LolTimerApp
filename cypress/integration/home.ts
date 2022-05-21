describe('LolTimerApp', () => {
  it('contains the information', () => {
    cy.visit('/');
    cy.contains('Home Page');
    cy.contains('Search a summoner name');
  });

  it('has the correct title', () => {
    cy.title().should('equal', 'LolTimerApp');
  });
});
