/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

declare global {
  namespace Cypress {
    interface Chainable {
      createSession(): Chainable<void>;
      deleteSession(): Chainable<void>;
    }
  }
}

export {};

Cypress.Commands.overwrite('log', function (log, ...args) {
  if (Cypress.browser.isHeadless) {
    return cy.task('log', args, { log: false }).then(() => {
      return log(...args);
    });
  } else {
    console.log(...args);
    return log(...args);
  }
});

Cypress.Commands.add('createSession', () => {
  cy.request({
    method: 'POST',
    url: '/api/web/auth/session',
    body: {
      name: Cypress.env('AUTH_SESSION_NAME'),
      credential: Cypress.env('AUTH_SESSION_CREDENTIAL'),
    },
  }).then((response) => {
    expect(response.status).to.eq(201);
  });
});

Cypress.Commands.add('deleteSession', () => {
  cy.request({
    method: 'DELETE',
    url: '/api/web/auth/session',
  }).then((response) => {
    expect(response.status).to.eq(204);
  });
});
