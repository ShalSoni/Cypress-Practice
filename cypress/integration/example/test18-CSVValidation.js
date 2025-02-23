//const neatCSV = require('neat-csv')
import neatCSV from 'neat-csv';

describe('JWT Session', ()=>{
    it('Purchase order and download csv', async () =>
    { 
        cy.LoginAPI().then(function() //defined in commands.js
        {
        cy.visit('https://rahulshettyacademy.com/client', //skips login page
            {//set options to inject token from local staorage
                onBeforeLoad : function(window)
                {
                    window.localStorage.setItem('token',Cypress.env('token')) //set token value on local storage for automatic login in session
                }
            })
    }) //explicit promise resolve as its a custom command
    })
    cy.get(".card-body b").eq(1).then(function(ele)
      {
      productName =  ele.text();
      })

    cy.get(".card-body button:last-of-type").eq(1).click(); //select last button of class for product at 1st index
    cy.get("[routerlink*='cart']").click(); //click add to cart
    cy.contains('Checkout').click() //based on text select button
    cy.get("[placeholder*='Country']").type('ind')
    cy.get(".ta-results button").each(($el,index,$list)=> 
        {
         if($el.text === " India"){
            cy.wrap($e1).click() 
        }
    })
    cy.get('.action_submit').click()
    cy.wait(2000) //this app csv takes time to load, so wait is applied
    cy.get('.order-summary button').contains("CSV").click()

     //cypress global object to dynamically 
    cy.readFile(Cypress.config("fileServerFolder")+"/cypress/downloads/order-invoice.csv").then(async(text) =>
    {
    const csv = await neatCSV(text) //convert content of csv to javascript object; convert in text format
    console.log(csv)

    const actualProductCSV = csv[0]["Product Name"]

    expect(productName).to.equal(actualProductCSV) //validate csv file content
    })  


  })