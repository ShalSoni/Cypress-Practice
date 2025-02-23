class SideMenuIncidentsxMatters
{
    getIncidentMenu()
  {
    cy.get('#INCIDENTS').click()
  }

    getIncidentTypes()
    {
        cy.get('#IncidentTypesPlace').click({force: true})
    }

    getTaskLists()
    {
        cy.get('#NAV_INCIDENT_TASK_LISTS').click({force: true})
    }
    
}
  


export default SideMenuIncidentsxMatters; //make class available to all other files in framework