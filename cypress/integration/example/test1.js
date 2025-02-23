//write cypress code - spec 1
//describe('My First Test', () => {
    //it('Does not do much!', () => {
      //expect(true).to.equal(true)
    //})
 // })

 /// <reference types="Cypress" /> 

  describe('My first test suite',function(){
    it('My first test case', function() 
    {
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/'); //global command to invoke cypress commands  
        cy.get('.search-keyword').type('ca')
        cy.wait(2000)

        cy.get('.product:visible').should('have.length',4)

        //ALIASING with 'as' to replace multiple locators with one alias
        cy.get('.products').as('productsLocator')

        cy.get('@productsLocator').find('.product').should('have.length',4) //find product within products; scope defined to avoid unwanted element selection
        
        cy.get('@productsLocator').find('.product').eq(2).contains('ADD TO CART').click() //select second product

        //iterate through all returned product and add cashwes to cart
        cy.get('@productsLocator').find('.product').each(($e1, index, $list) => {
           
            const vegName = $e1.find('h4.product-name').text() //define constant

            if (vegName.includes('Cashews')) 
            {
                cy.wrap($e1).find('button').click()
            }
        })

        cy.get('.brand').then(function(logoelement){
          cy.log(logoelement.text()) //log will bring output
        })
        //cy.log(logo.text()) 
        //'text()' is a jquery method; returns TEXT content of selected element

        //ASERT with 'should'
        cy.get('.brand').should('have.text','GREENKART')
      
    })
  })