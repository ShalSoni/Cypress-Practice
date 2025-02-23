import HomePage from "../pageObjects/HomePage"
import LoginPageXmatters from "../pageObjects/LoginPage-xMatters"
import SideMenuIncidentsxMatters from "../pageObjects/SideMenuIncidents-xMatters"

describe('Incident Type suite',function(){

    //Use FIXTURES to retrieve data
    before (function()
    {
        cy.fixture('xMatters test data').then(function(data)  
      {
        this.data=data 
      })
    })

    it('Create Incident Type', function() 
    {
        
        cy.visit("https://flow-company.tst.xmatters.com/xmatters/signOn.do") 

        //Login Page 
        const loginPage = new LoginPageXmatters()      
        loginPage.getEmailEditBox().type(this.data.email)        
        loginPage.getPasswordEditBox().type(this.data.password) 
        loginPage.getLoginButton()

        //Navigate Incidents menu > Incident Types sub-menu
        const incidentsMenu = new SideMenuIncidentsxMatters()
        incidentsMenu.getIncidentMenu()
        incidentsMenu.getIncidentTypes()        
        
        cy.get('.Header-module__headerText--T3S8m > span').should('have.text','Incident Types') //Page title assertion
        
        cy.get('[data-testid="IncidentTypes-AddIncidentType-button"]').click()   //Add Incident Type button        
        cy.get('.AddIncidentTypeSidePanel-module__title--yMqFb').should('have.text',"Create Incident Type") //side drawer title assertion
        cy.get('input[id="name"]').type(this.data.incType)

        //Validate unsaved changes pop-up
        //Ok Button
        cy.get('[data-testid="AddIncidentTypeSidePanel-closeBtn"] > span').click()
        cy.get('.ChickenExit-module__title--Pj1zZ').should('have.text',"Unsaved Changes")
        cy.get('.ChickenExit-module__content--XYeC2').should('have.text',"Unsaved incident type will be discarded. Are you sure you want to navigate away?")
        cy.get('[data-testid="button-confirm"]').click()
        
        //Close button
        cy.get('[data-testid="IncidentTypes-AddIncidentType-button"]').click()
        cy.get('input[id="name"]').type(this.data.incType)
        cy.get('[data-testid="AddIncidentTypeSidePanel-closeBtn"] > span').click()
        cy.get('[data-testid="button-abort"]').click()
        cy.get('.SidePanel-module__content--bUMY5').should('be.visible')

        //Create Incident Type
        cy.get('[data-testid="IncidentConsoleWidgetCheckboxes-affected_sites-field"] > .Checkbox_module__svgWrap--59369').then(function($el)
        {
        cy.wrap($el).click()
        })
        cy.get('[data-testid="AddIncidentTypeSidePanel-addBtn"]').should('be.enabled').click()
      
        cy.get('.Toast-module__toastLabel--UkY69').should('be.visible').contains('Incident type added.')
     

      //Unique incident type name validation - validation message, Create button disabled
        cy.get('[data-testid="IncidentTypes-AddIncidentType-button"]').click()   //Add Incident Type button        
        cy.get('input[id="name"]').type(this.data.incType)
        //Check for unique name validation message
        cy.get('[id="name_validation"]').should('have.text',"This name is already in use. All incident types must have unique names.")
        //Create button should be disabled
        cy.get('[data-testid="AddIncidentTypeSidePanel-addBtn"]').should('be.disabled') 

        cy.get('[data-testid="AddIncidentTypeSidePanel-closeBtn"]').click()



      
      
             
      
          
          
    
    })
        
  })

