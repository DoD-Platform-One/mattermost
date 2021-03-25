describe('Basic Mattermost', function() {
  it('Check Mattermost is accessible', function() {
    cy.visit(Cypress.env('mm_url'))
    // Wait for redirects to happen
    cy.get('div[id="root"]').should('be.visible')

    // Check if this is a fresh install or upgrade
    cy.url().then(($url) => {
      if ($url.includes('signup')) {
        cy.get('input[id="email"]').type(Cypress.env('mm_email'))
        cy.get('input[id="name"]').type(Cypress.env('mm_user'))
        cy.get('input[id="password"]').type(Cypress.env('mm_password'))
        cy.get('button[id="createAccountButton"]').click()

        cy.get('a[id="createNewTeamLink"]').click()
        cy.get('input[id="teamNameInput"]').type(Cypress.env('mm_user'))
        cy.get('button[id="teamNameNextButton"]').click()
        cy.get('button[id="teamURLFinishButton"]').click()

        cy.title().should('include', 'Town Square - ')

        cy.get('a[id="tutorialSkipLink"]').click()
        cy.get('textarea[id="post_textbox"]').type("Hello Big Bang").type('{enter}')
        cy.get('p').contains("Hello Big Bang").should('be.visible')
      } else {
        cy.get('input[id="loginId"]').type(Cypress.env('mm_user'))
        cy.get('input[id="loginPassword"]').type(Cypress.env('mm_password'))
        cy.get('button[id="loginButton"]').click()

        cy.title().should('include', 'Town Square - ')

        // Safeguard in case tutorial link is still there
        cy.get("body").then($body => {
          if ($body.find('a[id="tutorialSkipLink"]').length > 0) {
            cy.get('a[id="tutorialSkipLink"]').click()
          }
        })

        cy.get('textarea[id="post_textbox"]').type("Hello upgraded Big Bang").type('{enter}')
        cy.get('p').contains("Hello upgraded Big Bang").should('be.visible')
      }
    })
  })
})
