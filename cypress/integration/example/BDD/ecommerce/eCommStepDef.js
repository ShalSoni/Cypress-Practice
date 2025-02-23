import HomePage from "../../../pageObjects/HomePage" //importing page object created
import ProductPage from "../../../pageObjects/ProductPage"

import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

const homePage = new HomePage()
const productPage = new ProductPage()

Given('I open Ecommerce page', () => {
    cy.visit(Cypress.env('url')+"/angularpractice/") 

}) //Same Given statement as in feature file

//SCENARIO-1
// When I add items to cart
When ('I add items to cart', function()
{
    homePage.getShopTab().click() 

    Cypress.config('defaultCommandTimeout',8000)

    const productPg = new ProductPage()    

    this.data.productName.forEach(function (element) {
    cy.selectProduct(element) //select all items defined in productName defined in example.json fixture
    });

    productPg.checkOutButton().click()
})

//And Validate the Total Prices
When ('Validate the total prices', function() {
    // Sum of Products
    var sum = 0 //define total checkout value
    
    cy.get('tr td:nth-child(4) strong').each(($el, index, $list) => { //calculate total checkout value    

      const amount = $el.text() //extract text of amount
      var res = amount.split(" ") //split on space to separate amount number
      res = res[1].trim()
      sum = Number(sum) + Number(res) //convert string to number

    }).then(function () { //resolve promise to log sum only after loop has iterated over every element, if no "then", it will print in asychronous mode as '0
      cy.log(sum)
    })

    cy.get('h3 strong').then(function (element) {
      const amount = element.text()
      var res = amount.split(" ")
      var total = res[1].trim()
      expect(Number(total)).to.equal(sum)

    })
    
    //Then Select the country, Submit and verify success messsage
    Then('Then Select the country, Submit and verify success messsage', function() {
        cy.contains('Checkout').click()
        cy.get('#country').type('India')

        cy.get('.suggestions > ul > li > a').click()
       
        cy.get('#checkbox2').click({ force: true })

        cy.get('input[type="submit"]').click()
        
        //cy.get('.alert').should('have.text','Success! Thank you! Your order will be delivered in next few weeks :-).')
        cy.get('.alert').then(function (element) {
          const actualText = element.text()
          expect(actualText.includes("Success")).to.be.true // avoids extra space error which is present in expected text
        })
    })


    //SCENARIO-2 to Fill form details to shop - code taken from test13 
    When('I fill the form details', function(dataTable){ //take name and gender values given in fetaure file, here in 2D array form

        //name array in feature file will be in form [smith, male]
        //if 4 rows of of data are provided in feature file, same scenario will get executed 4 times
        name = dataTable.rawTable[1][0]
        homePage.getNameEmailEditBox().type(dataTable.rawTable[1][0]) //will take value from 1st row (starts at 0 index)
        homePage.getGender().select(dataTable.rawTable[1][1])       
    })

    Then ('Validate the form behavior', function() 
    {
        homePage.getTwoWayDataBindingEditBox().should('have.value',(name)) 
        cy.get('input[name="name"]:nth-child(2)').should('have.attr','minlength','2')
        homePage.getEnterpreneur().should('be.disabled')
        Cypress.config('defaultCommandTimeout',8000)
    })
    
    Then ('Select the Shop page', () =>
    {
        homePage.getShopTab().click() 
    })
    


})

