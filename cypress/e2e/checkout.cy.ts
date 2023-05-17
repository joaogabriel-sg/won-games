import { faker } from "@faker-js/faker"
import { User, createUser } from "../support/generate"

describe('Checkout', () => {
  let user: User

  describe('Free Games', () => {
    before(() => {
      if (!user)
        user = createUser({
          overrides: {
            username: faker.internet.userName(),
            password: faker.internet.password(),
          }
        })
    })

    after(() => {
      user = undefined
    })

    it('should buy free games', () => {
      cy.visit('/sign-up')
      cy.signUp(user)

      cy.url().should('eq', `${Cypress.config().baseUrl}/`)

      cy.findByRole('link', { name: /explore/i }).click()
      cy.wait(1000)
      cy.url().should('eq', `${Cypress.config().baseUrl}/games`)

      cy.findByText(/free/i).click()
      cy.wait(100)
      cy.url().should('contain', 'price_lte=0')

      cy.addToCartByIndex(0)

      cy.findAllByLabelText(/cart items/i).first().should('have.text', 1).click()

      cy.getByDataCy('cart-list').within(() => {
        cy.findByText(/buy it now/i).click()
      })

      cy.findByText(/only free games, click buy and enjoy!/i).should('exist')

      cy.findByRole('button', { name: /buy now/i }).click()

      cy.url().should('eq', `${Cypress.config().baseUrl}/success`)
      cy.findByText(/your purchase was successful!/i).should('exist')
    })

    it('should show games in order page', () => {
      cy.visit('/profile/orders')
      cy.location('href').should('eq', `${Cypress.config().baseUrl}/sign-in?callbackUrl=/profile/orders`)

      cy.signIn(user.email, user.password)
      cy.location('href').should('eq', `${Cypress.config().baseUrl}/profile/orders`)

      cy.getByDataCy('game-item').should('have.length', 1)
    })
  })

  describe('Paid Games', () => {
    before(() => {
      if (!user) user = createUser()
    })

    after(() => {
      user = undefined
    })

    it('should buy paid games', () => {
      user = createUser()
      cy.visit('/sign-up')
      cy.signUp(user)

      cy.url().should('eq', `${Cypress.config().baseUrl}/`)

      cy.findByRole('link', { name: /explore/i }).click()
      cy.wait(1000)
      cy.url().should('eq', `${Cypress.config().baseUrl}/games`)

      cy.findByText(/highest to lowest/i).click()
      cy.wait(100)
      cy.location('href').should('contain', 'sort=price%3Adesc')

      cy.addToCartByIndex(0)

      cy.findAllByLabelText(/cart items/i).first().should('have.text', 1).click()

      cy.getByDataCy('cart-list').within(() => {
        cy.findByText(/buy it now/i).click()
      })

      cy.findByRole('button', { name: /buy now/i }).should('have.attr', 'disabled')

      cy.fillElementsInput('cardNumber', '4242424242424242')
      cy.fillElementsInput('cardExpiry', '1040')
      cy.fillElementsInput('cardCvc', '104')

      cy.findByRole('button', { name: /buy now/i }).click()

      cy.url().should('eq', `${Cypress.config().baseUrl}/success`)
      cy.findByText(/your purchase was successful!/i).should('exist')
    })

    it('should show games in order page', () => {
      cy.visit('/profile/orders')
      cy.location('href').should('eq', `${Cypress.config().baseUrl}/sign-in?callbackUrl=/profile/orders`)

      cy.signIn(user.email, user.password)
      cy.location('href').should('eq', `${Cypress.config().baseUrl}/profile/orders`)

      cy.getByDataCy('game-item').should('have.length', 1)
    })
  })
})
