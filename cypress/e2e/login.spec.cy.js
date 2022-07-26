/// <reference types="cypress" />

describe('login', () => {
    beforeEach(() => {
        cy.visit('/signin')
    });
    
    // Day 0 - initial basic login tests

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

    // Day 1 - new tests based on learnings from day 1

    it('login without remember me, logout and ensure direct visit navigates to signin page', () => {
        
    });

    it('sign in, select Remember me, validate remember is true in login request', () => {
        cy.get('#username').type('Allie2')
        cy.get('#password').type('s3cret')
        cy.contains('span', 'Remember me').click()
        cy.get('.PrivateSwitchBase-input-14').should('have.attr', 'value', 'true')
        
        cy.intercept('POST', '/login').as('login_post')
        cy.contains('button', 'Sign In').click()

        cy.wait('@login_post').then(xhr => {
            expect(xhr.request.body['remember']).to.match(/true/)
        })

        cy.url().should('not.contain', '/signin')
    });
})