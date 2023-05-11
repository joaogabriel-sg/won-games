/// <reference types="cypress" />

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
    }
  }
}

export {}
