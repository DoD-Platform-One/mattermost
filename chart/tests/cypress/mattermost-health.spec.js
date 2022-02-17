Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false
})

describe('Mattermost Healthcheck', function() {
  // This provides us with a login account on fresh installs
  before(() => {
    cy.visit(Cypress.env('url'))
    cy.wait(2000)
    cy.get('div[id="root"]').should('be.visible')

    cy.url().then(($url) => {
      if ($url.includes('signup')) {
        // note: Mattermost behaves differently on first login depending on the URL
        //  https://chat.bigbang.dev versus http://mattermost.mattermost.svc.cluster.local:8065
        // explicitly visit the signup_email page
        // so that the test works the same locally and in the pipeline
        cy.visit(Cypress.env('url')+'/signup_email')
        cy.wait(2000)
        cy.get('input[id="email"]').type(Cypress.env('mm_email'))
        cy.get('input[id="name"]').type(Cypress.env('mm_user'))
        cy.get('input[id="password"]').type(Cypress.env('mm_password'))
        cy.get('button[id="createAccountButton"]').click()
      }
    })
  })

  beforeEach(() => {
    cy.visit(Cypress.env('url'))
    cy.wait(2000)
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
    cy.wait(2000)
    cy.get("body").then($body => {
      if ($body.find('a[id="createNewTeamLink"]').length > 0) {
        cy.get('a[id="createNewTeamLink"]').click()
        cy.get('input[id="teamNameInput"]').type("Big Bang")
        cy.get('button[id="teamNameNextButton"]').click()
        cy.get('button[id="teamURLFinishButton"]').click()
        cy.wait(2000)
        cy.title().should('include', 'Town Square - Big Bang')
      } else {
        cy.title().should('include', 'Town Square - Big Bang')
      }
    })

    cy.get("body").then($body => {
      if ($body.find('button[class="SidebarNextSteps__close"]').length > 0) {
        cy.get('button[class="SidebarNextSteps__close"]').click()
        cy.get('button[type="submit"] > span').contains("Remove").click()
      }
    })
  })

  it('should allow chatting', function() {
    let randomChat = "Hello " + Math.random().toString(36).substring(8);
    cy.wait(2000)
    cy.get('textarea[id="post_textbox"]').type(randomChat).type('{enter}')
    cy.get('p').contains(randomChat).should('be.visible')
  })

  it('should have file storage connection', function() {
    cy.visit(Cypress.env('url')+'/admin_console')
    cy.wait(5000)
    cy.get('a[id="environment/file_storage"]').click()
    cy.get('span').contains("Test Connection").click()
    cy.get('div[class="alert alert-success"]').should('be.visible')
  })
})
