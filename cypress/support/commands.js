// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })

//import cypress = require("cypress")

//
Cypress.Commands.add('selectProduct', (productName) => { //command selectProduct accepts an argument productName
//Use the custom command in test12 
    cy.get('h4.card-title').each(($el, index, $list) => { //select desired option from the available options e.g Blackberry
           
          if ($el.text().includes(productName)) 
        {
              cy.get('button.btn.btn-info').eq(index).click() //click on Add button for desired option
        }
    })
}) 


//Custom command for JWT session token test
Cypress.Commands.add('LoginAPI',()=>
{//cy.request(method, url, body)
        cy.request("POST","https://rahulshettyacademy.com/api/ecom/auth/login",
        {"userEmail":"shalz.soni@gmail.com","userPassword":"Complex@1"}).
        then(function(response)
        {
            expect(response.status).to.eq(200)
            Cypress.env('token',response.body.token); //set token to env variable so that its available to entire framework, key-value pair in bracket
        })
    })

//xMatters Login Page 
cypress.Commands.add('Login xMatters', (email,pwd) =>
{
    cy.visit(xMattersURL)
    cy.get('[data-testid="login-form-username"]').type(email)
    cy.get('[data-testid="login-form-password"]').type(pwd)
    cy.get('#submitButton').click()

}
)






//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })