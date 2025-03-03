class HomePage //create class for Home page
{
  getNameEmailEditBox()
  {
    return cy.get('input[name="name"]:nth-child(2)') 
  }

  getTwoWayDataBindingEditBox()
  {
    return cy.get(':nth-child(4) > .ng-untouched')
  }

  getGender()
  {
    return cy.get('select')
  }

  getEnterpreneur()
  {
     return cy.get('#inlineRadio3') 
  }

  getShopTab()
  {
    return cy.get(':nth-child(2) > .nav-link')
  }
}

export default HomePage; //make class available to all other files in framework