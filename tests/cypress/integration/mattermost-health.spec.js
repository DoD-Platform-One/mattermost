describe('Basic Mattermost', function() {
  it('Check Mattermost is accessible', function() {
      cy.visit(Cypress.env('mm_url'))
      cy.get('input[id="email"]').type(Cypress.env('mm_email'))
      cy.get('input[id="name"]').type(Cypress.env('mm_user'))
      cy.get('input[id="password"]').type(Cypress.env('mm_password'))
      cy.get('button[id="createAccountButton"]').click()
      
      cy.get('a[id="createNewTeamLink"]').click()
      cy.get('input[id="teamNameInput"]').type(Cypress.env('mm_user'))
      cy.get('button[id="teamNameNextButton"]').click()
      cy.get('button[id="teamURLFinishButton"]').click()

      cy.title().should('include', 'Town Square - ')
  })
})
