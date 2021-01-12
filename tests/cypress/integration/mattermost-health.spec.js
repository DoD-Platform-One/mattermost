describe('Basic MatterMost', function() {
  it('Check MatterMost is accessible', function() {
      cy.visit(Cypress.env('mattermost_url'))
  })
})
