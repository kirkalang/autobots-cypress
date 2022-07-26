import { faker } from '@faker-js/faker';

describe('login', () => {

    it('signup a valid user and login', () => {
        const firstName = faker.name.firstName()
        const lastName = faker.name.lastName()
        const username = `${firstName}.${lastName}`
        const password = faker.internet.password()

        cy.log('Navigate to signup. Fill in form and submit.')
        cy.visit('/signup')

        cy.get('#firstName').type(firstName)
        cy.get('[data-test="signup-submit"]').should('be.disabled')

        cy.get('#lastName').type(lastName)
        cy.get('[data-test="signup-submit"]').should('be.disabled')

        cy.get('#username').type(username)
        cy.get('[data-test="signup-submit"]').should('be.disabled')

        cy.get('#password').type(password)
        cy.get('[data-test="signup-submit"]').should('be.disabled')

        cy.get('#confirmPassword').type(password)

        cy.get('[data-test="signup-submit"]').should('be.enabled')
        cy.get('[data-test="signup-submit"]').click()

        cy.log('Validate navigated to signin page. Login as newly created user.')

        cy.url().should('contain', '/signin')
        cy.get('#username').type(username)
        cy.get('#password').type(password)
        cy.get('[data-test="signin-submit"]').click()

        cy.log('Validate navigated away from signin. Click Next on Get Started dialog')
        cy.url().should('not.contain', '/signin')
        //cy.get('[data-test="user-onboarding-dialog-title"] > h2').contains('Get Started with Real World App')
        cy.get('[data-test="user-onboarding-dialog-title"]').should('be.visible')
        cy.get('[data-test="user-onboarding-next"]').click()
    });
})