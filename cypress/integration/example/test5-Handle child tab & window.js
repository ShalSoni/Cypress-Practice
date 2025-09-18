describe('My fifth test suite',function(){
    it('My fifth test case', function() 
    {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/');

        //In HTML, if there is a button opening a link in another tab/window (child) then there is an attribute 'target="_blank_"'  
        //At run time with JQery and Cypress, we can remove this attribute and open the child tab in same tab as parent

        cy.get('#opentab').invoke('removeAttr','target').click()   //remove attribute 'target' with jquery function removeattr


        /* Approch 2 is to updated target attribute value to _self from _blank to open it in same tab
        
        cy.contains('Course Link').invoke('attr','target','_self').click()

        */

        //Validations of child page opened in same tab
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
        
          /* .first()
          .find('h2 a')
          .invoke('removeAttr','_blank').
          .click()

          cy.url().should()*/


//

       /* .find('h2 a')
        .then(($link) => {
        const productURL = $link.prop('href')
    
        cy.origin(new URL(productURL).origin, ()=> {
        cy.visit(productURL)
        })
        }
           
        })
    }   */
})})})