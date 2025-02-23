//write cypress code - spec 1
//describe('My First Test', () => {
    //it('Does not do much!', () => {
      //expect(true).to.equal(true)
    //})
 // })

 /// <reference types="Cypress" /> 

 //Add products to cart and checkout

  describe('My second test suite to add products to cart and check cart items',function(){
    it('My first test case', function() 
    {
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/');
        cy.get('.search-keyword').type('ca')
        cy.wait(2000)

        cy.get('.products').as('productsLocator')
        
        cy.get('@productsLocator').find('.product').each(($el, index, $list) => {
           
            const vegName = $el.find('h4.product-name').text() 
            if (vegName.includes('Cashews')) 
            {
                cy.wrap($el).find('button').click()
                cy.get('.cart-icon > img').click()
                cy.contains('PROCEED TO CHECKOUT').click()
                cy.contains('PLACE ORDER').click()
            }
            
      
        })

        
      
    })
  })