/// <reference types="cypress" />

context('Window', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/window')
  })

  it('cy.window() - get the global window object', () => {
    // https://on.cypress.io/window
    cy.window().should('have.property', 'top')
  })

  it('cy.document() - get the document object', () => {
    // https://on.cypress.io/document
    cy.document().should('have.property', 'charset').and('eq', 'UTF-8')
  })

  it('cy.title() - get the title', () => {
    // https://on.cypress.io/title
    cy.title().should('include', 'Kitchen Sink')
  })
})


//Retrive all cookied and print name value
var allcookies = document.cookie;
var arrCookies = allcookies.split(';');
for (let i=0; i<arrCookies.length; i++){
  name = arrCookies[i].split('=')[0];
  value = arrCookies[i].split('=')[1];
  console.log('Cookie name :'+ name + 'and value =' + value)
}