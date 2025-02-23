

describe('My eleventh test suite',function(){

    //Use FIXTURES to retrieve data
    before (function()
    {
        cy.fixture('example').then(function(data)  //filename under fixtures folder holding test data; resolve promise to access data using then
      {
        this.data=data //initialise golbal variable to be accessed everwhere outside block
      })
    })


    it('My eleventh test case', function() 
    {
        cy.visit('https://rahulshettyacademy.com/angularpractice/');
        
        cy.get('input[name="name"]:nth-child(2)').type(this.data.name)

        cy.get('select').select(this.data.gender)

        //TWO WAY data binding - auto-fill
        cy.get(':nth-child(4) > .ng-untouched').should('have.value',(this.data.name))

        //Check min length of 2 validation for Name field
        cy.get('input[name="name"]:nth-child(2)').should('have.attr','minlength','2') //minlength is attribute taken from DOM 

        //Validate if property is disabled or not
        cy.get('#inlineRadio3').should('be.disabled')
       
        })
        
    }   
)
    