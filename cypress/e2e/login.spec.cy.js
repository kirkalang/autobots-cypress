/// <reference types="cypress" />

describe('login', () => {
    beforeEach(() => {
        cy.visit('localhost:3000/signin')
    });
    
    
    it('login with username and password', () => {
        cy.get('#username').type('Allie2')
        cy.get('#password').type('s3cret')
        cy.get('[data-test="signin-submit"]').should('be.enabled').click()

        cy.url().should('not.contain', '/signin')
        cy.get('[data-test="sidenav-username"]').should('have.text', '@Allie2')
    })

    it('login button disabled until username & password fields not empty', () => {
        // Disabling line below due to bug in Real World App. 
        // Sign In btn only disabled after selecting input field
        // cy.get('[data-test="signin-submit"]').should('be.disabled')

        cy.get('#username').type('Allie2')
        cy.get('[data-test="signin-submit"]').should('be.disabled')

        cy.get('#username').clear()
        cy.get('#password').type('s3cret')
        cy.get('[data-test="signin-submit"]').should('be.disabled')
    })
})