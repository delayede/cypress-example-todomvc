Cypress.Commands.add('clickLoginButton', function() {
    cy.get('button[data-testid="login-submit"]', {log:false}).click()
})