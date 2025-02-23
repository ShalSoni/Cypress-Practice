describe('My fourteenth test suite',function(){

    //Use FIXTURES to retrieve data
    before (function()
    {
        cy.fixture('example').then(function(data)  //filename under fixtures folder holding test data; resolve promise to access data using then
      {
        this.data=data //initialise golbal variable to be accessed everwhere outside block
      })
    })


    it('My fourteenth test case', function() 
    {
        cy.visit(Cypress.env('url')+"/angularAppdemo/")

                cy.get("button[class='btn btn-primary']").click()
        //wait until the locator promise is resolved and then validate message in next step, explicit syc
        cy.intercept({ 
            //intercepting the GET method returning dynamic number of records, and forcing to return the given one record so that message can be validated
                //requestobject
                method: 'GET', 
                url: 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty'    
            },           
            {
                 //responseobject
                statusCode: 200,
                body: [{
                    "name": "RestAssured with Java",
                    "isbn": "BSG",
                    "aisle": "2302"
                }]
            }).as('bookretrievals')

            
        cy.wait('@bookretrievals').should(({request,response})=>
            {
                cy.get('tr').should('have.length',response.body.length+1)
             
            })  
            cy.get('p').should('have.text','Sorry we have only one book available')
            //length of the response array = rows of the table
    
            



    })
})