/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to visit Google page
       * @example cy.google()
       */
      google(): Chainable<void>
    }
  }
}

export {}
