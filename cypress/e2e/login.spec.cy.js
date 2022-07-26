/// <reference types="cypress" />

describe('login', () => {

    const data = {
        username: 'Allie2',
        password: 's3cret'
    }

    beforeEach(() => {
        cy.visit('/signin')
    });
    
    // Day 0 - initial basic login tests

    it('login with username and password', () => {
        cy.get('#username').type(data.username)
        cy.get('#password').type(data.password)
        cy.get('[data-test="signin-submit"]').should('be.enabled').click()

        cy.location('pathname').should('equal','/')
        cy.get('[data-test="sidenav-username"]').should('have.text', '@Allie2')
    })

    function submitBtnDisabled() {
        cy.get('[data-test="signin-submit"]')
            .should('be.disabled')
            .and('have.class', 'Mui-disabled')
    }

    it('login button disabled until username & password fields not empty', () => {
        cy.get('#username').type(data.username)
        submitBtnDisabled()

        cy.get('#username').clear()
        cy.get('#password').type(data.password)
        submitBtnDisabled()
    })

    // Day 1 - new tests based on learnings from day 1

    it('sign in, select Remember me, validate remember is true in login request', () => {
        cy.get('#username').type(data.username)
        cy.get('#password').type(data.password)
        cy.contains('span', 'Remember me').click()
        cy.get('.PrivateSwitchBase-input-14').should('have.attr', 'value', 'true')
        
        cy.intercept('POST', '/login').as('login_post')
        cy.contains('button', 'Sign In').click()

        cy.wait('@login_post').then(xhr => {
            expect(xhr.request.body['remember']).to.match(/true/)
        })

        cy.location('pathname').should('equal', '/')
    });
})