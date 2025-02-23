

describe('My twelveth test suite',function(){

  before (function()
  {
      cy.fixture('example').then(function(data)  //filename under fixtures folder holding test data; resolve promise to access data using then
    {
      this.data = data //initialise global variable inexample.json in fictures to be accessed everwhere outside block
    })
  })

  it('My twelveth test case', function() 
  {
      cy.visit('https://rahulshettyacademy.com/angularpractice/');
      cy.get(':nth-child(2) > .nav-link').click() //Shop option navigation      
      
    //iterate through each element of productName and add them to cart  
    this.data.productName.forEach(function (element) {  
      cy.selectProduct(element)
  });

  cy.pause() //pause test execution for debugging

    //    cy.get('h4.card-title').each(($el, index, $list) => { //select desired option from the available options e.g Blackberry
           
    //      if ($el.text().includes('Blackberry')) 
    //    {
    //          cy.get('button.btn.btn-info').eq(index).click() //click on Add button for desired option
    //      }
    //  })


    //Create custom command using above commented block; through support > commands.js
    //cy.selectProduct('Blckberry') // custom command created in command.js taking Blackberry as input value
    //cy.selectProduct('Nokia Edge') //both products will be added to cart

    
    
        
    })
        
  }   
)
    