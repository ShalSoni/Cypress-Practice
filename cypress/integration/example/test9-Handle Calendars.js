

describe('My ninth test suite',function(){
    it('My ninth test case', function() 
    {
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/offers');
        
        cy.get(".react-date-picker__inputGroup").click();

        const monthNumber = "6";
        const dateNumber = "15";
        const yearNumber = "2024";
        const expectedList = [monthNumber,dateNumber,yearNumber];

        cy.get(".react-calendar__navigation__label").click();
        cy.get(".react-calendar__navigation__label").click(); // two clicks to select year

        cy.contains("button",yearNumber).click(); //click based on text in yearNumber variable

        // map number to month name
        cy.get(".react-calendar__year-view__months__month").eq(Number(monthNumber)-1).click() //array starts at 0 so monthNumber-1

        cy.contains("abbr",dateNumber).click();    //tagname "abbr" should have date as text

        //Assertions 
        //common class of the selected calendar timestamp, so iterate through it 

        //Method 1
        cy.get('.react-date-picker__inputGroup__input').each(($e1,index)=>
            {
                cy.log(cy.wrap($e1).invoke('val')).then(function(text)
                {
                console.log(text)  //invoke value attribute in html   
                }
            ) 
            })  

        //Methos 2
        cy.get('.react-date-picker__inputGroup__input').each(($e1,index)=>
                {   //maintain expected list and compare actual value through automation
                    cy.wrap($e1).invoke('val').should('eq',expectedList[index]);
                    
                })
                  

        })
        
    }   
)
    