describe('My fifteenth test suite',function(){

    //Use FIXTURES to retrieve data
    before (function()
    {
        cy.fixture('example').then(function(data)  //filename under fixtures folder holding test data; resolve promise to access data using then
      {
        this.data=data //initialise golbal variable to be accessed everwhere outside block
      })
    })


    it('My fifteenth test case', function() 
    {
        cy.visit(Cypress.env('url')+"/angularAppdemo/")
        
        // cy.intercept(method, url, routeHandler)
        cy.intercept('GET','https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty',(req)=>
          {
            req.url = 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=malhotra' //modify request   

            req.continue((res)=>
              {
                expect(res.statusCode).to.equal(403)              
              })
            }).as('dummyurl')

            cy.get("button[class='btn btn-primary']").click()
            cy.wait('@dummyurl')   
            
            
    })        
  })
