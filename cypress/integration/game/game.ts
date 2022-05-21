const summonerName = 'Deferlis';

describe('when in the application', () => {
  describe('when looking at the summoner form ', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('should send to the game after submitting the form', () => {
      cy.dataTestId('summonerNameInput').type(summonerName);
      cy.dataTestId('summonerNameButton').click();
      cy.url().should('eq', 'http://localhost:4200/game/' + summonerName);
    });
  });

  describe('when game spectating', () => {
    beforeEach(() => {
      cy.intercept('GET', '/api/versions.json').as('getVersion');

      cy.spectateGame(summonerName);

      cy.get('participant').eq(6).as('participantComponent-jng'); // it won't work if we set a variable to cy.get('participant').eq(3)
    });

    it('should contain basic information about the 10 people in the game', () => {
      cy.get('participant').should('have.length', 10).should('be.visible');
      cy.get('team').should('have.length', 2).should('be.visible');
    });

    it('for a summoner, the component should contain all its information', () => {
      // role
      cy.get('@participantComponent-jng')
        .children('div')
        .children('p')
        .eq(0)
        .should('have.text', 'JUNGLE');

      //champion name
      cy.get('@participantComponent-jng')
        .children('div')
        .children('p')
        .eq(1)
        .should('have.text', 'Wukong');

      // check there is the spells, runes, summs ...
    });

    it('should call backend to get the current version', () => {
      cy.wait('@getVersion').then(({ response }) => {
        expect(response?.body[0]).to.match(/[0-9]*\.[0-9]*\.[0-9]*/);
      });
    });

    describe('about the summs', () => {
      beforeEach(() => {
        cy.wait(100); // wait for load

        cy.get('@participantComponent-jng')
          .children('div')
          .children('participant-summs')
          .children('div')
          .children('summoner-spell')
          .eq(1)
          .as('participantComponent-jng-SummonerSpell')
          .children('div')
          .children('input')
          .as('participantComponent-jng-SummonerSpellInput');
      });

      it('should have the correct initial values', () => {
        cy.get('@participantComponent-jng-SummonerSpellInput')
          .invoke('attr', 'alt')
          .then((altText) => {
            expect(altText).to.equal('Ignite');
          });
        cy.get('@participantComponent-jng-SummonerSpell').children('p').should('have.text', '180');
      });

      describe('when using them', () => {
        beforeEach(() => {
          cy.get('@participantComponent-jng-SummonerSpellInput').click();
        });

        it('should decrement the values after time has passed', () => {
          cy.wait(3000); // wait some time

          cy.get('@participantComponent-jng-SummonerSpell')
            .children('p')
            .should('have.text', '172'); // 175 - 3
        });

        describe('and using them again, this time via command line', () => {
          beforeEach(() => {
            cy.dataTestId('command').type('i j 170s');
            cy.dataTestId('submit-command').click();
          });

          it('should have the correct values', () => {
            cy.get('@participantComponent-jng-SummonerSpell')
              .children('p')
              .should('have.text', '10'); // 180 - 170
          });
        });

        describe('and changing timers with the buttons', () => {
          beforeEach(() => {
            it('should remove 10s with the --', () => {
              cy.get('@participantComponent-jng-SummonerSpell')
                .children('div')
                .children('button')
                .eq(0)
                .click(); // remove 10 sec

              cy.get('@participantComponent-jng-SummonerSpell')
                .children('p')
                .should('have.text', '165'); // 175 - 10
            });

            it('should remove 10s with the -', () => {
              cy.get('@participantComponent-jng-SummonerSpell')
                .children('div')
                .children('button')
                .eq(1)
                .click() // remove 5 sec
                .click() // remove 5 sec
                .click(); // remove 5 sec

              cy.get('@participantComponent-jng-SummonerSpell')
                .children('p')
                .should('have.text', '150'); // 165 - 15
            });

            it('should add 5s with the +', () => {
              cy.get('@participantComponent-jng-SummonerSpell')
                .children('div')
                .children('button')
                .eq(2)
                .click(); // add 5 sec

              cy.get('@participantComponent-jng-SummonerSpell')
                .children('p')
                .should('have.text', '155'); // 150 + 5
            });

            it('should add 10s with the ++', () => {
              cy.get('@participantComponent-jng-SummonerSpell')
                .children('div')
                .children('button')
                .eq(3)
                .click(); // add 10 sec

              cy.get('@participantComponent-jng-SummonerSpell')
                .children('p')
                .should('have.text', '165'); // 155 + 10
            });
          });
        });

        describe('and about the border', () => {
          describe('when there is still some left', () => {
            beforeEach(() => {
              cy.get('@participantComponent-jng-SummonerSpellInput').click();
            });

            it('should not have a border to indicate that', () => {
              cy.get('@participantComponent-jng-SummonerSpell')
                .children('div')
                .should('not.have.class', 'soon');
            });
          });

          describe('when there is few times left', () => {
            beforeEach(() => {
              cy.get('participant')
                .eq(9)
                .children('div')
                .children('participant-summs')
                .children('div')
                .children('summoner-spell')
                .eq(0) // smite
                .as('participantComponent-sup-SummonerSpell')
                .children('div')
                .children('input')
                .as('participantComponent-sup-SummonerSpellInput')
                .click(); // will go from 13s to 8s
            });

            it('should have a border to indicate that', () => {
              cy.get('@participantComponent-sup-SummonerSpell')
                .children('div')
                .should('have.class', 'soon-up');
            });
          });
        });
      });
    });

    describe('when swapping two players', () => {
      beforeEach(() => {
        cy.get('@participantComponent-jng')
          .children('div')
          .children('div')
          .children('select')
          .select('SUPPORT');

        cy.get('participant').eq(6).as('participantComponent-jng-AfterSwap');
      });

      it('should correctly swap players', () => {
        // I didn't find a way to check the DOM element
        cy.get('@participantComponent-jng-AfterSwap')
          .children('div')
          .children('p')
          .eq(1)
          .should('have.text', 'Evelynn');
      });
    });
  });
});
