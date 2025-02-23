describe('My fourth test suite',function(){
    it('My fourth test case', function() 
    {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/');

        //ALERT POP-UPS HANDLING

        cy.get('#alertbtn').click()
        cy.get('[value="Confirm"]').click() //cypress automatically handles alert pop-ups; its not shown when running tests

        //WINDOE:ALERT manually trigger alert through cypress
        cy.on('window:alert',(str)=> 
            {  //fire window alert through cypress to capture the alert content
                expect(str).to.equal('Hello , share this practice page and share your knowledge')
            }
        )   
        
        cy.on('window:confirm',(str)=> 
            {  //fire window alert through cypress, confirm event and capture the alert content
                expect(str).to.equal('Hello , Are you sure you want to confirm?')
            }
        )
    }   
)})