

describe('My tenth test suite',function(){

    //Use FIXTURES to retrieve data
    before (function()
    {
        cy.fixture('example').then(function(data)  //filename under fixtures folder holding test data; resolve promise to access data using then
      {
        this.data=data //intiatiz global variable to be accessed everwhere outside block
      })
    })


    it('My tenth test case', function() 
    {
        cy.visit('https://rahulshettyacademy.com/angularpractice/');
        
        cy.get('input[name="name"]:nth-child(2)').type(this.data.name)

        cy.get('select').select(this.data.gender)
       
        })
        
    }   
)
    