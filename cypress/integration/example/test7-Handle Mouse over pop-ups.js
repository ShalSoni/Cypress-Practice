describe('My seventh test suite',function(){
    it('My seventh test case', function() 
    {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/');
        
        cy.get('div.mouse-hover-content').invoke('show')   //invoke 'show' method of jquery
        cy.contains('Top').click()         
        cy.url().should('includes','top') //also checks for url which is returned on clicking top

        // cypress forcibly clicks on hidden element 'top' option without checking or mouse over function
        cy.contains('Top').click( {force: true} ) 

        })
        
    }   
)
    