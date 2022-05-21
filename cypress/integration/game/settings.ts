const summonerNameSettings = 'Deferlis';

describe('when game spectating', () => {
  beforeEach(() => {
    cy.spectateGame(summonerNameSettings);
    // wait for render ?
    // https://stackoverflow.com/questions/64661879/cypress-how-to-wait-for-all-requests-to-finish
  });

  it('should contain the settings to show', () => {
    cy.contains('Show summoner names');
    cy.contains('Show summoner ranks');
  });

  it('should contain the language dropdown', () => {
    cy.dataTestId('languageDropdown').should('exist');
    cy.dataTestId('languageDropdown').should('have.text', 'fren'); // fren = fr + en
    // I didn't find any easy way to check the dropdown values without selecting them
  });

  describe('when going into the settings', () => {
    describe('when turning on the summoner names option', () => {
      beforeEach(() => {
        cy.dataTestId('showSummonerNamesCheckbox').check();
      });

      it('should display the summoner name', () => {
        cy.contains(summonerNameSettings);
      });

      it('should not display the champion name', () => {
        cy.contains('Renata').should('not.exist');
      });
    });

    describe('when turning on the summoner ranks option', () => {
      beforeEach(() => {
        cy.dataTestId('showSummonerRanksCheckbox').check();
      });

      it('should display the summoner name', () => {
        cy.contains('D4');
      });
    });

    describe('when switching the language to en', () => {
      beforeEach(() => {
        cy.dataTestId('languageDropdown').select('fr');
      });

      it('should go back to home', () => {
        cy.url().should('eq', 'http://localhost:4200/');
      });

      describe('and after going back to see the game', () => {
        beforeEach(() => {
          cy.spectateGame(summonerNameSettings);
        });

        it('should change the static traductions', () => {
          // todo when i18n done
        });

        // idk how to check that spells have french trads now
      });
    });
  });
});
