describe('Mattermost Healthcheck', function() {
  // This provides us with a login account on fresh installs
  before(() => {
    cy.visit(Cypress.env('url'))
    cy.get('div[id="root"]').should('be.visible')

    cy.url().then(($url) => {
      if ($url.includes('signup')) {
        cy.get('input[id="email"]').type(Cypress.env('mm_email'))
        cy.get('input[id="name"]').type(Cypress.env('mm_user'))
        cy.get('input[id="password"]').type(Cypress.env('mm_password'))
        cy.get('button[id="createAccountButton"]').click()
      }
    })
  })

  beforeEach(() => {
    cy.visit(Cypress.env('url'))
    cy.get('div[id="root"]').should('be.visible')

    // Check if login is needed
    cy.url().then(($url) => {
      if ($url.includes('login')) {
        cy.get('input[id="loginId"]').type(Cypress.env('mm_user'))
        cy.get('input[id="loginPassword"]').type(Cypress.env('mm_password'))
        cy.get('button[id="loginButton"]').click()
      }
    })
    cy.wait(500)
  })

  it('should create / persist teams', function() {
    cy.get("body").then($body => {
      if ($body.find('a[id="createNewTeamLink"]').length > 0) {
        cy.get('a[id="createNewTeamLink"]').click()
        cy.get('input[id="teamNameInput"]').type("Big Bang")
        cy.get('button[id="teamNameNextButton"]').click()
        cy.get('button[id="teamURLFinishButton"]').click()
        cy.title().should('include', 'Town Square - Big Bang')
      } else {
        cy.title().should('include', 'Town Square - Big Bang')
      }
    })
    cy.get("body").then($body => {
      if ($body.find('a[id="tutorialSkipLink"]').length > 0) {
        cy.get('a[id="tutorialSkipLink"]').click()
      }
    })    
  })

  it('should allow chatting', function() {
    let randomChat = "Hello " + Math.random().toString(36).substring(8);
    cy.get('textarea[id="post_textbox"]').type(randomChat).type('{enter}')
    cy.get('p').contains(randomChat).should('be.visible')
  })

  it('should have file storage connection', function() {
    cy.get('button[aria-label="main menu"]').click()
    cy.get('a[href="/admin_console"]').click()

    cy.get('a[id="environment/file_storage"]').click()
    cy.get('span').contains("Test Connection").click()
    cy.get('div[class="alert alert-success"]').should('be.visible')
  })

  it('should save settings changes', function() {
    cy.get('button[aria-label="main menu"]').click()
    cy.get('a[href="/admin_console"]').click()

    cy.get('a[id="site_config/customization"]').click()
    let randomName = Math.random().toString(36).substring(8);
    cy.get('input[id="TeamSettings.SiteName"]').clear().type(randomName)
    cy.get('button[id="saveSetting"]').click()
    cy.reload()
    cy.title().should('include', randomName)
  })
})
