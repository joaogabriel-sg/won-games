/// <reference types="cypress" />

import { User } from "./generate"

type ShowcaseAttributes = {
  name: string
  highlight?: boolean
}

type FieldsAttributes = {
  label: string
  name: string | number
}

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to visit Google page
       * @example cy.google()
       */
      google(): Chainable<Window>

      /**
       * Custom command to sign up
       * @example cy.signUp({ username: 'jgsg', email: 'jgsg@email.com', password: '123' })
       */
      signUp(user: User): Chainable<Element>

      /**
       * Custom command to sign in
       * @example cy.signIn()
       */
      signIn(email?: string, password?: string): Chainable<Element>

      /**
       * Custom command to get element by data-cy
       * @example cy.getByDataCy('selector')
       */
      getByDataCy(selector: string): Chainable<Element>

      /**
       * Custom command to get fields by label
       * @example cy.getFields([{ label: 'foo', name: 'foo' }])
       */
      getFields(fields: FieldsAttributes[]): Chainable<Element>

      /**
       * Custom command to check banner in page
       * @example cy.shouldRenderBanner()
       */
      shouldRenderBanner(): Chainable<Element>

      /**
       * Custom command to check showcase in page
       * @example cy.shouldRenderShowcase()
       */
      shouldRenderShowcase(attrs: ShowcaseAttributes): Chainable<Element>

      /**
       * Custom command to check if value is less than price
       * @example cy.shouldBeLessThan(100)
       */
      shouldBeLessThan(value: number): Chainable<Element>

      /**
       * Custom command to check if value is greater than price
       * @example cy.shouldBeGreaterThan(50)
       */
      shouldBeGreaterThan(value: number): Chainable<Element>

      /**
       * Custom command to add to cart by index
       * @example cy.addToCartByIndex(1)
       */
      addToCartByIndex(index: number): Chainable<Element>

      /**
       * Custom command to remove from cart by index
       * @example cy.removeFromCartByIndex(1)
       */
      removeFromCartByIndex(index: number): Chainable<Element>
    }
  }
}

export {}
