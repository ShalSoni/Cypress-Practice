describe('My third test suite',function(){
    it('My third test case', function() 
    {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/');

        // CHECKBOX
        
        cy.get('#checkBoxOption1').check().should('be.checked').and('have.value','option1') //checkbox assertion
        cy.get('#checkBoxOption1').uncheck().should('not.be.checked') //test for uncheck

        //get all checkboxes but check only ones mentioned
        cy.get('input[type="checkbox"]').check(['option2','option3']) //tagname[attribute="value"] selector; check(['value'])


        //DROPDOWNS - For static dropdown tagname will be "Select"

        cy.get('select').select('option2').should('have.value','option2') //select and compare id option2 is selected or not

        cy.get('#autocomplete').type('ind')
        
        cy.get('.ui-menu-item div').each(($e1, index, $list) => {
           

            if ($e1.text()===('India')) 
            {
                cy.wrap($e1).click() //wrapping element to select
            }
        })
        cy.get('#autocomplete').should('have.value','India')


        //INVISIBLE ELEMENTS - Show / Hide options render field
        cy.get('#displayed-text').should('be.visible') //verify text box is visible or not
        cy.get('#hide-textbox').click() //click Hide checkbox
        cy.get('#displayed-text').should('not.be.visible') //check text box is not visible after Hide
        cy.get('#show-textbox').click() //click Show checkbox
        cy.get('#displayed-text').should('be.visible') //verify text box is visible or not

        //RADIO BUTTONS - similar to checkboxes
        cy.get('[value="radio2"]').check().should('be.checked') // value is unique

    }   
)})