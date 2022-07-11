Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false
})

describe('Mattermost Healthcheck', function() {
  // This provides us with a login account on fresh installs
  before(() => {
    cy.visit(Cypress.env('url'))
    cy.wait(8000)
    // cy.wait(15000)
    cy.get('div[id="root"]').should('be.visible')

    cy.url().then(($url) => {
      if ($url.includes('signup')) {
        // note: Mattermost behaves differently on first login depending on the URL
        //  https://chat.bigbang.dev versus http://mattermost.mattermost.svc.cluster.local:8065
        // explicitly visit the signup_email page
        // so that the test works the same locally and in the pipeline
        cy.visit(Cypress.env('url')+'/signup_email')
        cy.wait(5000)
        // cy.wait(10000)
        cy.get('input[id="input_email"]').type(Cypress.env('mm_email'))
        // #input
        cy.get('input[id="input_name"]').type(Cypress.env('mm_user'))
        cy.get('input[id="input_password-input"]').type(Cypress.env('mm_password'))
        cy.get('button[id="saveSetting"]').click()
      }
    })
  })

  beforeEach(() => {
    cy.visit(Cypress.env('url'))
    cy.wait(5000)
    // cy.wait(10000)
    cy.get('div[id="root"]').should('be.visible')

    // Check if login is needed
    cy.url().then(($url) => {
      if ($url.includes('login')) {
        cy.get('input[id="input_loginId"]').type(Cypress.env('mm_user'))
        cy.get('input[id="input_password-input"]').type(Cypress.env('mm_password'))
        cy.get('button[id="saveSetting"]').click()
      }
    })
    cy.wait(500)
  })

  it('should create / persist teams', function() {
    cy.wait(5000)
    // cy.wait(10000)

    cy.url().then(($url) => {
      cy.wait(1000)
      if ($url.includes('select_team')) {
        // create a team 
        cy.get('a[id="createNewTeamLink"]').click()
        cy.wait(3000)
        // Input Big Bang
        cy.get('input[id="teamNameInput"]').type('Big Bang')
        // Click Next
        cy.get('button[id="teamNameNextButton"]').click()
        //cy.get('input[id="teamURLInput"]').should('include', 'big-bang')
        // Click finish
        cy.get('button[id="teamURLFinishButton"]').click()
        // Give some time for dialog load
        cy.wait(10000)
        cy.get('.link > span').contains("No thanks").click()
        cy.wait(3000)
      }
    })

    // click on Town Square
    cy.wait(1000)
    cy.visit(Cypress.env('url')+'/big-bang/channels/town-square')
    cy.wait(10000)
    cy.title().should('include', 'Town Square - Big Bang Mattermost')
  })

  it('should allow chatting', function() {
    let randomChat = "Hello " + Math.random().toString(36).substring(8);
    cy.wait(5000)
    // cy.wait(10000)
    cy.get('textarea[id="post_textbox"]').type(randomChat).type('{enter}')
    cy.get('p').contains(randomChat).should('be.visible')
  })

  it('should have file storage connection', function() {
    cy.visit(Cypress.env('url')+'/admin_console/environment/file_storage')
    cy.wait(10000)
    // cy.wait(30000)
    cy.get('span:contains("Test Connection")').click()
    cy.get('div[class="alert alert-success"]').should('be.visible')
  })
})
