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
        incidentsMenu.getTaskLists()        
        
        cy.get('.Header-module__headerText--ggEt2 > span').should('have.text','Task Lists') //Page title assertion        
        
        cy.get('.MiniInfoBox-module__title--PHhTk').should('have.text','Create and manage task lists')
        cy.get('.MiniInfoBox-module__description--se5YE').should('have.text','Create task lists, or playbooks, that resolvers can follow during incidents to streamline their response, adhere to best practices, and reduce mean time to resolution.')
        cy.get('.MiniInfoBox-module__dismissButtonIcon--QKK1b').click()
        cy.get('[data-testid="IncidentTaskLists-AddIncidentTaskList-button"]').click()

      // Add task List modal
        cy.get('.DialogBox_module__title--e3024').should('have.text','Add Task List')
        cy.get('[data-testid="addTaskListDialog_name"]').as('taskListName')
        cy.get('[data-testid="addTaskListDialog_description"]').as('taskListDescription')

      //Max Name and Decription length validation
        cy.get('@taskListName').should('have.attr','maxlength','101').type('https://flow-company.tst.xmatters.com/xmatters/ui/incidents/incident-task-listshttps://flow-company.tst.xmatters.com/xmatters/ui/incidents/incident-task-lists')
        cy.get('.AddTaskListDialog-module__taskListName--bGy35 > :nth-child(3) > span').should('have.text','Cannot be greater than 100 characters.')
                   
        cy.get('@taskListDescription').should('have.attr','maxlength','2001').type('https://flow-company.tst.xmatters.com/xmatters/ui/incidents/incident-task-listshttps://flow-company.tst.xmatters.com/xmatters/ui/incidents/incident-task-listshttps://flow-company.tst.xmatters.com/xmatters/ui/incidents/incident-task-listshttps://flow-company.tst.xmatters.com/xmatters/ui/incidents/incident-task-listshttps://flow-company.tst.xmatters.com/xmatters/ui/incidents/incident-task-listshttps://flow-company.tst.xmatters.com/xmatters/ui/incidents/incident-task-listshttps://flow-company.tst.xmatters.com/xmatters/ui/incidents/incident-task-listshttps://flow-company.tst.xmatters.com/xmatters/ui/incidents/incident-task-listshttps://flow-company.tst.xmatters.com/xmatters/ui/incidents/incident-task-listshttps://flow-company.tst.xmatters.com/xmatters/ui/incidents/incident-task-listshttps://flow-company.tst.xmatters.com/xmatters/ui/incidents/incident-task-listshttps://flow-company.tst.xmatters.com/xmatters/ui/incidents/incident-task-listshttps://flow-company.tst.xmatters.com/xmatters/ui/incidents/incident-task-listshttps://flow-company.tst.xmatters.com/xmatters/ui/incidents/incident-task-listshttps://flow-company.tst.xmatters.com/xmatters/ui/incidents/incident-task-listshttps://flow-company.tst.xmatters.com/xmatters/ui/incidents/incident-task-listshttps://flow-company.tst.xmatters.com/xmatters/ui/incidents/incident-task-listshttps://flow-company.tst.xmatters.com/xmatters/ui/incidents/incident-task-listshttps://flow-company.tst.xmatters.com/xmatters/ui/incidents/incident-task-listshttps://flow-company.tst.xmatters.com/xmatters/ui/incidents/incident-task-listshttps://flow-company.tst.xmatters.com/xmatters/ui/incidents/incident-task-listshttps://flow-company.tst.xmatters.com/xmatters/ui/incidents/incident-task-listshttps://flow-company.tst.xmatters.com/xmatters/ui/incidents/incident-task-listshttps://flow-company.tst.xmatters.com/xmatters/ui/incidents/incident-task-listshttps://flow-company.tst.xmatters.com/xmatters/ui/incidents/incident-task-listshttps://flow-company.tst.x')
        cy.get('.AddTaskListDialog-module__taskListDescription--wG8FW > .AddTaskListDialog-module__errorBubble--G9sLT > span').should('Cannot be greater than 2000 characters.')
              
      //Create new task list
        cy.get('@taskListName').clear().type('Automation Task List 1')
        cy.get('[data-testid="AddTaskListDialog_save"]').should('be.enabled').click()
        cy.get('.ToastList-module__toast-list--YaW7F').should('be.visible').and('have.text',"Task List 'Automation Task List 1' added.")

      //Update task list on creation
        cy.get('.TaskListTitleDescription-module__editText--gvA3Q > nth-child(1)').click()
        cy.get('[data-testid="incident-task-title"]').type('Automation Task List 1 updated')

        cy.get('.TaskListTitleDescription-module__editText--gvA3Q > nth-child(2)').click()
        cy.get('[data-testid="incident-task-description"]').type('Description added')

        cy.get('.TaskListTable-module__emptyStateDescription--WiMku').should('have.text','You don’t have any tasks in this list yet')
        cy.get('[data-testid="TaskListsTable-empty-addTask"]').as('addTask')

        cy.get('.TaskSidePanel-module__title--KHeCW').should('have.text','Add Task')
        
      //Add Task with Due Date - None
        cy.get('[data-testid="incidentTask_name_input"]').as('taskName')
        cy.get('@taskName').type('Task 1')

        cy.get('[data-testid="incidentTask_description_input"]').as('taskDescription')
        cy.get('@taskDescription').type('Due date - None')

        cy.get('.Checkbox_module__label--59369').as('addAnotherTask')
        cy.get('@addAnotherTask')


        cy.get('[data-testid="incidentTask_dueDate_dropdown"]').as('dueDateDropdown')
        cy.get('@dueDateDropdown').click()
        cy.get('.Dropdown_module__list--d274b').as('dueDateDropdownOptions')
    

        cy.get('[role="menuitem"]').each(($e1, index, $list) => {           

          if ($e1.text()===('India')) 
          {
              cy.wrap($e1).click() //wrapping element to select
          }
      })

    


        




       

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

