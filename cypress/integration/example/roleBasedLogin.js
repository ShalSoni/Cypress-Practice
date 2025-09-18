Cypress.Commands.add('loginAs', (role) => {
  cy.fixture(`${role}.json`).then((user) => {
    cy.request('POST', '/api/login', user).then((response) => {
      window.localStorage.setItem('token', response.body.token)
    })
  })
})


