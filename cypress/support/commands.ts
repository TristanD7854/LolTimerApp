/* eslint-disable @typescript-eslint/no-namespace */
// ***********************************************
// This example namespace declaration will help
// with Intellisense and code completion in your
// IDE or Text Editor.
// ***********************************************
// declare namespace Cypress {
//   interface Chainable<Subject = any> {
//     customCommand(param: any): typeof customCommand;
//   }
// }
//
// function customCommand(param: any): void {
//   console.warn(param);
// }
//
// NOTE: You can use it like so:
// Cypress.Commands.add('customCommand', customCommand);
//
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    dataCy(value: string): Chainable<JQuery<HTMLElement>>;
    dataTestId(value: string): Chainable<JQuery<HTMLElement>>;

    spectateGame(summonerName: string): void;
  }
}

function dataCy(value: string): Cypress.Chainable<JQuery<HTMLElement>> {
  return cy.get(`[data-cy=${value}]`);
}

function dataTestId(value: string): Cypress.Chainable<JQuery<HTMLElement>> {
  return cy.get(`[data-testid=${value}]`);
}

function spectateGame(summonerName: string): void {
  cy.visit('/game/' + summonerName);
}

Cypress.Commands.add('dataCy', dataCy);
Cypress.Commands.add('dataTestId', dataTestId);
Cypress.Commands.add('spectateGame', spectateGame);
