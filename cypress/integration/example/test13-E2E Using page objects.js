
import HomePage from "../pageObjects/HomePage" //importing page object created
import ProductPage from "../pageObjects/ProductPage"

describe('My thirteenth test suite',function(){

    //Use FIXTURES to retrieve data
    before (function()
    {
        cy.fixture('example').then(function(data)  //filename under fixtures folder holding test data; resolve promise to access data using then
      {
        this.data=data //initialise golbal variable to be accessed everwhere outside block
      })
    })


    it('My thirteenth test case', function() 
    {
            
      //create object of the class
        //use memory allocator 'new', store in a var
        const homePage = new HomePage()
      
        //cy.visit('https://rahulshettyacademy.com/angularpractice/');
        cy.visit(Cypress.env('url')+"/angularpractice/") //define env url in cypress.config.cy
        
        homePage.getNameEmailEditBox().type(this.data.name) //use homePage object 

        homePage.getGender().select(this.data.gender)

        //TWO WAY data binding - auto-fill
        //cy.get(':nth-child(4) > .ng-untouched').should('have.value',(this.data.name))
        homePage.getTwoWayDataBindingEditBox().should('have.value',(this.data.name)) 

        //Check min length of 2 validation for Name field
        cy.get('input[name="name"]:nth-child(2)').should('have.attr','minlength','2') //minlength is attribute taken from DOM 
   

        //Validate if property is disabled or not
        //cy.get('#inlineRadio3').should('be.disabled')
        homePage.getEnterpreneur().should('be.disabled')

        //Click Shop tab
        homePage.getShopTab().click() 

        Cypress.config('defaultCommandTimeout',8000)

        const productPg = new ProductPage()        

        this.data.productName.forEach(function (element) {

          cy.selectProduct(element) //select all items defined in productName defined in example.json fixture
        });

        productPg.checkOutButton().click() //click checout button

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
        
    }   
)
    