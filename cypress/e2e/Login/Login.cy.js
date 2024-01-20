import '../../support/LoginCommands'
beforeEach (function(){

    cy.visit('login')
    
})

describe('Login', () => {
   it('Login with valid credential', () => {

    cy.get('#email').type('fortcontentt@gmail.com')
    cy.get('#password').type('123456')
    cy.clickLoginButton()
    cy.url().should('include', 'app');
    cy.get('[data-testid ="home"]').should('be.visible')

});
});

describe('Login with invalid credentials', () => {
    
it('Login with empty credential', () => {
    cy.clickLoginButton()
    cy.get('.mb-3').find('.invalid-feedback').should('have.be.visible')
});

it('Login with valid email and invalid password', () => {
    cy.get('#email').type('fortcontentt@gmail.com')
    cy.get('#password').type('1')
    cy.clickLoginButton()
    cy.get('.mb-3').find('.invalid-feedback').eq(1).should('have.be.visible')

});

it('login with valid password and invalid email', () => {
    cy.get('#email').type('f')
    cy.get('#password').type('123456')
    cy.clickLoginButton()
    cy.get('.mb-3').find('.invalid-feedback').eq(0).should('have.be.visible')
});





});


