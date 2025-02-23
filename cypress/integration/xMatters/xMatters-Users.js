import HomePage from "../pageObjects/HomePage"
import LoginPageXmatters from "../pageObjects/LoginPage-xMatters"

describe('My first test suite',function(){

    //Use FIXTURES to retrieve data
    before (function()
    {
        cy.fixture('xMatters test data').then(function(data)  
      {
        this.data=data 
      })
    })

    it('My first test case', function() 
    {
        
         

        //Login Page Object
        const loginPage = new LoginPageXmatters()      
        loginPage.getEmailEditBox().type(this.data.email)        
        loginPage.getPasswordEditBox().type(this.data.password) 
        loginPage.getLoginButton()

        //Navigate Users menu > Users sub-menu
        cy.get('[data-testid="mainNav_item mainNav_item-USERS"]').click()

        cy.get('[data-testid="subNavMenu_item subNavMenu_item-NAV_USERS"]').click({force: true}) // {force: true} beacuse otherwise error of parent overflow
     
        cy.intercept('GET', '/people')
        cy.get('[data-testid="CreateUser_OpenModal"]').click()
    
        //Test Add Users modal
        cy.get('.DialogBox_module__title--e3024 > span').should('have.text','Add Users')

        cy.get('[name="user.firstName"]').type(this.data.fname) //first name
        cy.get('[name="user.lastName"]').type(this.data.lname)  //last name

        cy.get('[name="user.roles"]').type('fu')          // Roles
        cy.get('.Row_module__selectOptionRow--c11cc').contains('Full Access User').click({force: true})

        cy.get('[name="user.site"]').type('de')
        cy.get('.Row_module__optionValue--c11cc').contains('Default Site').click({force: true}) //Site

        cy.get('[name="user.targetName"]').type(this.data.userid) //username

        cy.get('[data-testid="Checkbox_user.useAsWebLoginId"] > .Checkbox_module__svgWrap--59369').click() //Checkbox

        cy.get('[name="user.webLogin"]').type(this.data.userid) //weblogin

        cy.get('[data-testid="CreateUserModal_PasswordField_user_password"]').type(this.data.userpwd) //password and confirm password
        cy.get('[name="confirmPassword"]').type(this.data.userpwd)

        cy.get('[name="devices[Work Email].emailAddress"]').type(this.data.workEmail) //Work Email

        //List property
        cy.get('input[name="user.properties._list%20property"]').type('li')
        cy.get('.Row_module__selectOptionRow--c11cc').contains('list1').click({force: true})
        //cy.get('[name="user.properties._list%20property"]').should('have.value','list1')

        //Checkbox property
        cy.get('[data-testid="Checkbox_user.properties._checkbox"] > .Checkbox_module__svgWrap--59369').click()

        //Multiselect property
        cy.get('input[name="user.properties._MULTISELECT"]').type('1')
        cy.get('.Row_module__selectOptionRow--c11cc').each(($e1, index, $list) => {      
          if ($e1.text()===('1')) 
          {
              cy.wrap($e1).click() //wrapping element to select
              
          }
        })

        //Text property
        cy.get('input[name="user.properties._text1"]').type("test")

        //Number property
        cy.get('input[name="user.properties._number"]').type("6")

        //Password property
        cy.get('input[name="user.properties._pwd"]').type('Complex@1')

        cy.get('button[type=submit]').click() //Submit button

        cy.get('.UserListHeader-module__exitButton--PwrZC').click() //Exit button on New Users listing page

        cy.get('.ChickenExit-module__title--Pj1zZ').should('have.text',"Return to Users Page") //Chicken Exit text validation
        cy.get('.ChickenExit-module__content--XYeC2').should('have.text',"You can send a welcome message or add users to a group at any time from the Users page.")     //Return to Users Page chicken exit

        cy.get('[data-testid="button-confirm"]').contains('OK').click()




    }
    )})
        






        
      



