let customWaitTime;
before(() => {
  customWaitTime = parseInt(Cypress.env('waittime'), 10) || 3000; 
});


Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false
})

describe('Mattermost Healthcheck', function() {
// Checks if mattermost sidebar pops up
  function bannercheck() {
    cy.wait(customWaitTime)
    cy.get('body').then($body => {
        if ($body.find('.link > span').length > 0) {   
            //evaluates as true if banner exists at all
                cy.get('.link > span').then($header => {
                  if ($header.is(':visible')){
                    // evaluates to true if the banner is visible
                    console.log("Banner is Present")
                    $header.click()
                  } else {
                    console.log("Banner is not present")
                  }
                });
            }
          })
        }
// Clicks the view in browser on MM
  function browsercheck() {
    cy.url().then(url => {
      if (url.includes('landing')) {
        cy.get('a.btn.btn-default.btn-lg.get-app__continue').click()
        }
      })
    }
// Login credentials after sign up is complete
  function login() {
    cy.url().then(url => {
      if (url.includes('login')) {
        cy.get('input[id="input_loginId"]').type(Cypress.env('mm_user'))
        cy.get('input[id="input_password-input"]').type(Cypress.env('mm_password'))
        cy.get('button[id="saveSetting"]').click()
        }
      })
    }

  it('Keycloak SSO login or create User & Login', function() {
  
  // This provides us with a login account on fresh installs
    cy.visit(Cypress.env('url'))
    cy.wait(customWaitTime)

    cy.get('div[id="root"]').should('be.visible')

    browsercheck()

    cy.wait(customWaitTime)
// Only runs if Keycloak_test_enable = 'true'
    if (Cypress.env('keycloak_test_enable')) {
      cy.contains('a#gitlab', 'GitLab').click();
      cy.get('input[id="username"]')
          .type(Cypress.env('keycloak_username'))
          .should('have.value', Cypress.env('keycloak_username'));


      cy.get('input[id="password"]')
        .type(Cypress.env('keycloak_password'))
        .should('have.value', Cypress.env('keycloak_password'));

        
      cy.get('form').submit(); 
  // Accept Terms and Conditions
      cy.get('input[id="kc-accept"]').click();
  // Grant Privileges
      cy.get('input[id="kc-login"]').click(); 
        }
  
    cy.wait(customWaitTime)
    cy.url().then(url => { 
      if (url.includes('signup_user_complete')) {
        cy.get('input[id="input_email"]').type(Cypress.env('mm_email'))
        cy.get('input[id="input_name"]').type(Cypress.env('mm_user'))
        cy.get('input[id="input_password-input"]').type(Cypress.env('mm_password'))
        cy.get('button[id="saveSetting"]').click()
      }
    })
    
    login();

    cy.wait(customWaitTime)

    cy.url().then(url => {
      if (url.includes('select_team')) {
      // create a team 
        cy.get('a[id="createNewTeamLink"]').click()
        cy.wait(customWaitTime)
        // Input Big Bang
        cy.get('input[id="teamNameInput"]').type('Big Bang')
        // Click Next
        cy.get('button[id="teamNameNextButton"]').click()
        // Click finish
        cy.get('button[id="teamURLFinishButton"]').click()
        // Give some time for dialog load
      }
    })
    cy.url().then(url => {
      if (url.includes ('preparing-workspace')) {

      // Input Big Bang
        cy.get('input[class="Organization__input"]').type('Big Bang')
        // Click Next
        cy.get('button[class="primary-button"]').click()
        cy.wait(customWaitTime)
        cy.get('button[class="link-style plugins-skip-btn"]').click()
        cy.wait(customWaitTime)
        cy.get('div[class="InviteMembers__submit"] button[class="primary-button"').click()
        cy.wait(customWaitTime)
        // Give some time for dialog load
      }
    })
    cy.wait(customWaitTime)
    cy.visit(Cypress.env('url')+'/big-bang/channels/town-square')
    cy.wait(customWaitTime)
    cy.title().should('include', 'Town Square - Big Bang Mattermost')

    bannercheck()
    let randomChat = "Hello " + Math.random().toString(36).substring(8);
    cy.wait(customWaitTime)
    cy.get('body').then($body => {
      if ($body.find('.close > [aria-hidden="true"]').length > 0) {   
        cy.get('.close > [aria-hidden="true"]').click()
      }
    })

    cy.get('textarea[id="post_textbox"]').type(randomChat).type('{enter}')
    cy.wait(customWaitTime)
    browsercheck()
    login()
    cy.get('p').contains(randomChat).should('be.visible')
    
  })

  it('should have file storage connection', function() {
    cy.visit(Cypress.env('url')+'/admin_console/environment/file_storage')
    cy.wait(customWaitTime)
    
    browsercheck()

    cy.wait(customWaitTime)
  
    login()
    bannercheck()

    cy.get('span:contains("Test Connection")', {timeout: customWaitTime}).click()
    cy.wait(customWaitTime)
    cy.get('div[class="alert alert-success"]').should('be.visible')
  })
})
