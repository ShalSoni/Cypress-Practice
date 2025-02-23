
import LoginPageXmatters from "../pageObjects/LoginPage-xMatters"
import SideMenuIncidentsxMatters from "../pageObjects/SideMenuIncidents-xMatters"

describe('Edit Incident Type test suite',function(){
  beforeEach (function()
    {
        cy.fixture('xMatters test data').then(function(data)  
      {
        this.data=data 
      })  
      
    })

    it('Test Case 1- Tabs, header UI & Empty State Validation for Incident Properties tab', function() 
    {
      //Login and navigate to Incidents - Incident Types 
      cy.visit(Cypress.env('xMattersURL'))
      
      const loginPage = new LoginPageXmatters()      
      loginPage.getEmailEditBox().type(this.data.email)        
      loginPage.getPasswordEditBox().type(this.data.password) 
      loginPage.getLoginButton()

      const incidentsMenu = new SideMenuIncidentsxMatters()
      incidentsMenu.getIncidentMenu()
      incidentsMenu.getIncidentTypes()

                     
        //Tabs validation    
        cy.contains("Automation Incident Type").click()
        cy.get('.IncidentTypeDetails-module__tab--CMMTt').as('Tabs') //Aliasing
        cy.get('@Tabs').eq(0).should('have.text',"Incident Properties") //Incident Properties tab
        cy.get('@Tabs').eq(1).should('have.text',"Incident Console Layout") //Incident Console Layout tab

        //Emtpy state validation for Incident Properties tab
        cy.get('.IncidentTypeDetails-module__emptyStateTitle--PNztf > span').should('have.text',"You haven’t created any properties for this incident type yet")
        cy.get('.IncidentTypeDetails-module__noProperties--FgUxK > :nth-child(3)').should('have.text',"Predefine attributes common to all incidents with the same incident type") 
        cy.get('[data-testid="createPropertyLink"]').should('have.text', "Create Incident Property").and('be.enabled')
        
    })

    it('Test Case 2 - Edit Incident Type - Unsaved Changes pop-up validation & UI elements', function() 
    {
      cy.visit(Cypress.env('xMattersURL')) 

      //Login Page 
      const loginPage = new LoginPageXmatters()      
      loginPage.getEmailEditBox().type(this.data.email)        
      loginPage.getPasswordEditBox().type(this.data.password) 
      loginPage.getLoginButton()

      
      //Navigate Incidents menu > Incident Types sub-menu
      const incidentsMenu = new SideMenuIncidentsxMatters()
      incidentsMenu.getIncidentMenu()
      incidentsMenu.getIncidentTypes()
                     
        //Edit Incident Type
      
        cy.contains("Automation Incident Type").click()
        cy.get('.EditableLabel_module__labelWrapper--8663f > :nth-child(2)').click()
        
        //Add Incident Properties 
        cy.get('[data-testid="button-AddPropertyButton"]').as('addPropertyButton') 
        cy.get('@addPropertyButton').should('be.enabled').click()
        
        cy.get('[data-testid="AddIncidentProperty-default-value-field"]').as('propertyDefaultValue')  
        cy.get('input[id="description"]').as('propertyDescription')   
        cy.get('input[id="helpText"]').as('propertyHelp')   
        cy.get('label[for="validate"]').as('regexText')
        cy.get('div[name="validate"]').as('regexToggle')
        
        cy.get('.UpsertPropertySidePanel-module__header--M7HTR').should('have.text', "Create Incident Property")
        cy.get('[data-testid="AddIncidentProperty-name-field"]').as('propertyName')
        cy.get('@propertyName').type("property 1")
        
        //Unsaved Changes pop-up validation
        cy.get('[data-testid="AddIncidentTypePropertySidePanel-closeBtn"]').as('sideDrawerClose')
        cy.get('[data-testid="AddIncidentTypePropertySidePanel-addBtn"]').as('sideDrawerAdd')

        cy.get('@sideDrawerAdd').should('be.enabled')
        cy.get('@sideDrawerClose').should('be.enabled').click()
       
        cy.get('.ChickenExit-module__title--Pj1zZ').should('have.text',"Unsaved Changes")
        cy.get('.ChickenExit-module__content--XYeC2').should('have.text',"Unsaved incident type property will be discarded. Are you sure you want to navigate away?")
        cy.get('[data-testid="button-confirm"]').click() //Ok button    
                
        cy.get('@addPropertyButton').should('be.enabled').click()
        cy.get('@propertyName').type("property 1")
        cy.get('@sideDrawerClose').should('be.enabled').click()
        cy.get('[data-testid="button-abort"]').click() //Cancel button
        cy.get('[data-testid="AddIncidentTypeProperty-sidePanel"]').should('be.visible') //Side drawer should remain open

        cy.get('.icon-info').trigger('mouseover').invoke('show') 
        cy.contains('Add information about the property for users initiating an incident.') //help text infotip
    })

    it('Test Case 3 - Edit Incident Types - Add Incident Properties', function() 
    {
        
      cy.visit(Cypress.env('xMattersURL')) 

      //Login Page 
      const loginPage = new LoginPageXmatters()      
      loginPage.getEmailEditBox().type(this.data.email)        
      loginPage.getPasswordEditBox().type(this.data.password) 
      loginPage.getLoginButton()

      
      //Navigate Incidents menu > Incident Types sub-menu
      const incidentsMenu = new SideMenuIncidentsxMatters()
      incidentsMenu.getIncidentMenu()
      incidentsMenu.getIncidentTypes()
                     
        //Edit Incident Type
      
        cy.contains("Automation Incident Type").click()
        cy.get('.EditableLabel_module__labelWrapper--8663f > :nth-child(2)').click()
        

        //Add Incident Properties 
        cy.get('[data-testid="button-AddPropertyButton"]').as('addPropertyButton') 
        cy.get('@addPropertyButton').click()
        
        //Aliases
        cy.get('[data-testid="AddIncidentProperty-name-field"]').as('propertyName')
        cy.get('[data-testid="AddIncidentProperty-default-value-field"]').as('propertyDefaultValue')  
        cy.get('input[id="description"]').as('propertyDescription')   
        cy.get('input[id="helpText"]').as('propertyHelp')   
        cy.get('label[for="validate"]').as('regexText')
        cy.get('div[name="validate"]').as('regexToggle')            
        cy.get('[data-testid="AddIncidentTypePropertySidePanel-addBtn"]').as('createButton') 
        cy.get('.ToastList-module__toast-list--YaW7F').as('successToast')    
             
                
      //1. Add property - no regex, only Name 
        cy.get('@propertyName').type("property 1")
        cy.get('@propertyDefaultValue').type('default value - no regex')
        cy.get('@propertyDescription').type('property has default value with no regex')
        cy.get('@createButton').click({force: true})    
        cy.get('@successToast').should('be.visible').and('have.text','Incident type property added.')

        //Unique name validation
        cy.get('@propertyName').clear().type("property 1")
        cy.get('[data-testid="FormInput_validation"]').contains('This name is already in use. All properties within an incident type must have unique names.')
      
        

      //2. Add property - regex - Letters only
          cy.get('@propertyName').clear().type("property 2")

        //Invalid default value validation - Letters only
          cy.get('@propertyDefaultValue').type('1234') 
          cy.get('@regexToggle').click()
          cy.get('[data-testid="AddIncidentProperty-pchooserinput-searchSelect"]').as('regexSelect')   
          cy.get('@regexSelect').click()
          cy.get('[role="option"]').as('regexPattern')
          cy.get('@regexPattern').each(($e1, index, $list) => {       
            if ($e1.text()===('Letters only')) 
            {
              cy.wrap($e1).click() //wrapping element to select
              cy.log('element found')
            }
          })          
          cy.get('.SearchSelect_module__valueOption--77c9e > span').as('regexSelected')
          cy.get('@regexSelected').contains('Letters only')        
          cy.get('@createButton').click()           
          cy.get('.Toast-module__toastContent--phWsS').as('errorToast')
          cy.get('@errorToast').contains('Default value 1234 must match the specified pattern [A-Z,a-z]*.')
          cy.get('[data-testid="icon-toast-close"]').as('closeToast')
          cy.get('@closeToast').click({ multiple: true })
           
        //Valid default value - Letters only
          cy.get('@propertyDefaultValue').clear().type  ('testprop')
          cy.get('@propertyDescription').type('property has default value with regex - Letters only')                      
          cy.get('@createButton').click() 
          cy.get('@successToast').should('be.visible').and('have.text','Incident type property added.')



      //3. Add property - regex - Numbers only
          cy.get('@propertyName').clear().type("property 3")
          cy.get('@propertyDescription').type('property has default value with regex - Numbers only')

        //Invalid default value validation
          cy.get('@propertyDefaultValue').type('a') 
          cy.get('@regexToggle').click()          
          cy.get('@regexSelect').click()
          cy.get('@regexPattern').each(($e1, index, $list) => {       
            if ($e1.text()===('Numbers only')) 
            {
              cy.wrap($e1).click() //wrapping element to select
            }
          })          
          cy.get('@regexSelected').contains('Numbers only')        
          cy.get('@createButton').click()           
          cy.get('@errorToast').should('contain','Default value a must match the specified pattern \\\d*.')
          cy.get('@closeToast').click({ multiple: true })
           
        //Valid default value - Numbers only
          cy.get('@propertyDefaultValue').clear().type('1234')                                
          cy.get('@createButton').click() 
          cy.get('@successToast').should('be.visible').and('have.text','Incident type property added.')



      //4. Add property - regex - 5 Numbers only
          cy.get('@propertyName').clear().type("property 4")
          cy.get('@propertyDescription').type('property has default value with regex - 5 Numbers only')

        //Invalid default value validation 
          cy.get('@propertyDefaultValue').type('1234') 
          cy.get('@regexToggle').click()          
          cy.get('@regexSelect').click()
          cy.get('@regexPattern').each(($e1, index, $list) => {       
           if ($e1.text()===('5 Numbers only')) 
           {
            cy.wrap($e1).click() //wrapping element to select
           }
          })          
          cy.get('@regexSelected').contains('5 Numbers only')        
          cy.get('@createButton').click()           
          cy.get('@errorToast').should('contain','Default value 1234 must match the specified pattern \\\d{5}.')
          cy.get('@closeToast').click({ multiple: true })

          cy.get('@propertyDefaultValue').clear().type('123456')                              
          cy.get('@createButton').click() 
          cy.get('@errorToast').contains('Default value 123456 must match the specified pattern \\\d{5}.')
          cy.get('@closeToast').click({ multiple: true })
         
        //Valid default value - 5 Numbers only
          cy.get('@propertyDefaultValue').clear().type('12345')                           
          cy.get('@createButton').click() 
          cy.get('@successToast').should('be.visible').and('have.text','Incident type property added.')



      //5. Add property - regex - Basic Decimal Number
          cy.get('@propertyName').clear().type("property 5")
          cy.get('@propertyDescription').type('property has default value with regex - Basic Decimal number')

        //Invalid default value validation - Basic Decimal number
          cy.get('@propertyDefaultValue').type('ab') 
          cy.get('@regexToggle').click()          
          cy.get('@regexSelect').click()
          cy.get('@regexPattern').each(($e1, index, $list) => {       
           if ($e1.text()===('Basic Decimal number')) 
           {
            cy.wrap($e1).click()
           }
          })          
          cy.get('@regexSelected').contains('Basic Decimal number')        
          cy.get('@createButton').click()           
          cy.get('@errorToast').should('contain','Default value ab must match the specified pattern') // [-\\+]?\d+\\\.?\\\d.
          cy.get('@closeToast').click({ multiple: true })
            
        //Valid default value - Basic Decimal number
          cy.get('@propertyDefaultValue').clear().type('12')                           
          cy.get('@createButton').click() 
          cy.get('@successToast').should('be.visible').and('have.text','Incident type property added.')



      //6. Add property - regex - Generic date time
          cy.get('@propertyName').clear().type("property 6")
          cy.get('@propertyDescription').type('property has default value with regex - Generic date time')

        //Invalid default value validation 
          cy.get('@propertyDefaultValue').type('12AM') 
          cy.get('@regexToggle').click()          
          cy.get('@regexSelect').click()
          cy.get('@regexPattern').each(($e1, index, $list) => {       
            if ($e1.text()===('Generic date time')) 
            {
             cy.wrap($e1).click() //wrapping element to select
            }
          })          
          cy.get('@regexSelected').contains('Generic date time')        
          cy.get('@createButton').click()           
          cy.get('@errorToast').should('contain','Default value 12AM must match the specified pattern \\\d{1,4}/\\\d{1,2}/\\\d{1,4} \\\d{1,2}:\\\d{2}(:\\\d{2}) (AM|PM)?.')
          cy.get('@closeToast').click({ multiple: true })
          
        //Valid default value - Generic date time
          cy.get('@propertyDefaultValue').clear().type('15/07/2024 10:45:00 AM')                           
          cy.get('@createButton').click() 
          cy.get('@successToast').should('be.visible').and('have.text','Incident type property added.')


      
      //7. Add property - regex - Basic IP Address
          cy.get('@propertyName').clear().type("property 7")
          cy.get('@propertyDescription').type('property has default value with regex - Basic IP Address (no range checking)')

        //Invalid default value validation - Basic IP Address
          cy.get('@propertyDefaultValue').type('12') 
          cy.get('@regexToggle').click()          
          cy.get('@regexSelect').click()
          cy.get('@regexPattern').each(($e1, index, $list) => {       
           if ($e1.text()===('Basic IP Address (no range checking)')) 
           {
            cy.wrap($e1).click() //wrapping element to select
           }
          })          
          cy.get('@regexSelected').contains('Basic IP Address (no range checking)')        
          cy.get('@createButton').click()           
          cy.get('@errorToast').should('contain','Default value 12 must match the specified pattern \\\d{1,3}\\\.\\\d{1,3}\\\.\\\d{1,3}\\\.\\\d{1,3}.')
          cy.get('@closeToast').click({ multiple: true })
          
        //Valid default value - Basic IP Address
          cy.get('@propertyDefaultValue').clear().type('11.12.13.444')                           
          cy.get('@createButton').click() 
          cy.get('@successToast').should('be.visible').and('have.text','Incident type property added.')


      
      //8. Add property - regex - ISO Date time
          cy.get('@propertyName').clear().type("property 8")
          cy.get('@propertyDescription').type('property has default value with regex - ISO Date time')

        //Invalid default value validation - ISO Date time
          cy.get('@propertyDefaultValue').type('12') 
          cy.get('@regexToggle').click()          
          cy.get('@regexSelect').click()
          cy.get('@regexPattern').each(($e1, index, $list) => {       
           if ($e1.text()===('ISO Date time (ISO 8601) for example (2010-09-14T04:20:15Z)')) 
           {
            cy.wrap($e1).click()
           }
          })          
          cy.get('@regexSelected').contains('ISO Date time (ISO 8601) for example (2010-09-14T04:20:15Z)')        
          cy.get('@createButton').click()           
          cy.get('@errorToast').should('contain','Default value 12 must match the specified pattern \\\d{4}\\\-\\\d{2}\\\-\\\d{2}T\\\d{2}:\\\d{2}(:\\\d{2})?(Z)?.')
          cy.get('@closeToast').click({ multiple: true })
          
        //Valid default value - ISO Date time 
          cy.get('@propertyDefaultValue').clear().type('2024-09-14T04:20:15Z')                           
          cy.get('@createButton').click() 
          cy.get('@successToast').should('be.visible').and('have.text','Incident type property added.')

      
      //9. Add property - regex - Boolean 
          cy.get('@propertyName').clear().type("property 9")
          cy.get('@propertyDescription').type('property has default value with regex - Boolean')

        //Invalid default value validation - Boolean
          cy.get('@propertyDefaultValue').type('12') 
          cy.get('@regexToggle').click()          
          cy.get('@regexSelect').click()
          cy.get('@regexPattern').each(($e1, index, $list) => {       
            if ($e1.text()===('Boolean (case-insensitive)')) 
            {
             cy.wrap($e1).click()
            }
          })          
          cy.get('@regexSelected').contains('Boolean (case-insensitive)')        
          cy.get('@createButton').click()           
          cy.get('@errorToast').contains('Default value 12 must match the specified pattern (?i:true|false|yes|no).')
          cy.get('@closeToast').click({ multiple: true })
      
        //Valid default value - Boolean 
          cy.get('@propertyDefaultValue').clear().type('true')                           
          cy.get('@createButton').click() 
          cy.get('@successToast').should('be.visible').and('have.text','Incident type property added.')
    
      

      //10. Add property - regex - String 10 characters or shorter 
          cy.get('@propertyName').clear().type("property 10")
          cy.get('@propertyDescription').type('property has default value with regex - String 10 characters or shorter')

        //Invalid default value validation - String 10 characters or shorter 
          cy.get('@propertyDefaultValue').type('12345678910') 
          cy.get('@regexToggle').click()          
          cy.get('@regexSelect').click()
          cy.get('@regexPattern').each(($e1, index, $list) => {       
            if ($e1.text()===('String 10 characters or shorter')) 
            {
              cy.wrap($e1).click()
            }
            })          
          cy.get('@regexSelected').contains('String 10 characters or shorter')        
          cy.get('@createButton').click()           
          cy.get('@errorToast').contains('Default value 12345678910 must match the specified pattern .{0,10}.')
          cy.get('@closeToast').click({ multiple: true })
  
        //Valid default value - String 10 characters or shorter 
          cy.get('@propertyDefaultValue').clear().type('1234567890')                           
          cy.get('@createButton').click() 
          cy.get('@successToast').should('be.visible').and('have.text','Incident type property added.')

      
      

    //11. Add property - regex - Custom 
          cy.get('@propertyName').clear().type("property 11")
          cy.get('@propertyDescription').type('property has default value with regex - Custom')
          cy.get('@propertyHelp').type('2 numbers and letters')

        //Invalid default value validation - Custom
          cy.get('@propertyDefaultValue').type('123ab') 
          cy.get('@regexToggle').click()          
          cy.get('@regexSelect').click()
          cy.get('@regexPattern').each(($e1, index, $list) => {       
            if ($e1.text()===('Custom')) 
            {
              cy.wrap($e1).click()
            }
            })          
          cy.get('@regexSelected').contains('Custom')        
          cy.get('@createButton').click()           
          cy.get('@errorToast').contains('Default value 123df must match the specified pattern .{0,2}[A-Z,a-z]*.')
          cy.get('@closeToast').click({ multiple: true })

        //Valid default value - Custom
          cy.get('@propertyDefaultValue').clear().type('12ab')                           
          cy.get('@createButton').click() 
          cy.get('@successToast').should('be.visible').and('have.text','Incident type property added.')
     })

    it('Test Case 4 - Edit Incident Type - Delete Incident Properties', function() 
        {
          cy.visit(Cypress.env('xMattersURL')) 
      
        //Login Page 
          const loginPage = new LoginPageXmatters()      
          loginPage.getEmailEditBox().type(this.data.email)        
          loginPage.getPasswordEditBox().type(this.data.password) 
          loginPage.getLoginButton()
      
            
        //Navigate Incidents menu > Incident Types sub-menu
          const incidentsMenu = new SideMenuIncidentsxMatters()
          incidentsMenu.getIncidentMenu()
          incidentsMenu.getIncidentTypes()
                           
        //Delete Incident Type Property           
          cy.contains("Automation Incident Type").click()
          cy.get('.ButtonStyledLikeLink_module__button--85c4a').each(($e1, index, $list) => {          

            cy.wrap($e1).click() 
            cy.get('[data-testid="AddIncidentTypePropertySidePanel-delBtn"]').click()
            cy.get('.DialogBox_module__title--e3024 ChickenExit-module__title--Pj1zZ > span').should('have.text','Delete Property')
            cy.get('"DialogBox_module__content--e3024 ChickenExit-module__content--XYeC2 > span').should('have.text','This property will still be available in existing incidents and Post-Incident Reports. However, future incidents will not be able to use this property. Are you sure you want to proceed?')
            cy.get('[data-testid="button-confirm"]').click()
            cy.get('.ToastList-module__toast-list--YaW7F').should('be.visible').and('have.text','Property deleted.') 
            
        })
      })
          
    it('Test Case 5 - Edit Incident Type - Delete Incident Type', function() 
        {
          cy.visit(Cypress.env('xMattersURL')) 
      
        //Login Page 
          const loginPage = new LoginPageXmatters()      
          loginPage.getEmailEditBox().type(this.data.email)        
          loginPage.getPasswordEditBox().type(this.data.password) 
          loginPage.getLoginButton()
      
            
        //Navigate Incidents menu > Incident Types sub-menu
          const incidentsMenu = new SideMenuIncidentsxMatters()
          incidentsMenu.getIncidentMenu()
          incidentsMenu.getIncidentTypes()
                           
        //Delete Incident Type Property           
        cy.get('[col-id="name"]').each(($el, index, $list) => { 
           
           
          if ($e1.text()===('00 PSD')) 
            {
              cy.wrap($e1).click()
             
              cy.get('[col-id="name"]').eq(index).next().then(function(clickbox)
                  {
                      cy.get('class="Checkbox_module__wrapper--59369"').click()
                      
                  } )}            
              
          })
        })
      })
