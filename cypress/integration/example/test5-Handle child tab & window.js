describe('My fifth test suite',function(){
    it('My fifth test case', function() 
    {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/');

        //In HTML, if there is a button opening a link in another tab/window (child) then there is an attribute 'target="_blank_"'  
        //At run time with JQery and Cypress, we can remove this attribute and open the child tab in same tab as parent

        cy.get('#opentab').invoke('removeAttr','target').click()   //remove attribute 'target' with jquery function removeattr

        //Validatins od child page opened in same tab
        cy.origin('https://www.qaclickacademy.com', () => { //Cypress throws error when running tests in cross-domain when child tab is opened in same tab as parent domain

            cy.get("#navbarSupportedContent a[href*='about']").click();
            cy.get('.mt-50 h2').should('contain','QAClick Academy');
          })

        //jquery 'prop' method; first resolve promise using 'then'
        //cy.visit(Cypress.env('url')+"AutomationPractice/")
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/');
        cy.get('#opentab').then(function(e1) 
        {
           const url = e1.prop('href') //get property value

           cy.visit(url)

           cy.origin(url, () =>
            {                //navigate to new domain
              cy.get("div.sub-menu-bar a[href*='about']").click()   //all functions on new domain should be within origin command
           })
        
           
        })
    }   
)})