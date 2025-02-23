import LoginPageXmatters from "../pageObjects/LoginPageXmatters"

describe('My Second test suite',function(){

    //Use FIXTURES to retrieve data
    before (function()
    {
        cy.fixture('xMatters test data').then(function(data)  
      {
        this.data=data 
      })
    })

    it('My second test case', function() 
    {
        
        cy.visit("https://flow-company.tst.xmatters.com/xmatters/signOn.do") 

        //Login Page Object
        const loginPage = new LoginPageXmatters()     
        loginPage.getEmailEditBox().type(this.data.email)        
        loginPage.getPasswordEditBox().type(this.data.password)  
        loginPage.getLoginButton()

        //Navigate to sub-menu
        cy.get('#USERS').click()
        cy.get('#WebServiceUserDetails').click({force: true})
        cy.get('.page-title').should('have.text','Add Web Service User')

        cy.get('[name="targetName"]').type(this.data.wsname)
        cy.get('[name="password').type(this.data.wspwd)
        cy.get('[name="verifyPassword').type(this.data.wspwd)

        cy.get('select').select('Add Device')
        cy.get('select').select('Add Coverage')

        cy.get('#addButton').click()

        
})

})
