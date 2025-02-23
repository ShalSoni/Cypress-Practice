
import 'cypress-iframe'

describe('My eighth test suite',function(){
    it('My eighth test case', function() 
    {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/');
        
        //Frames are one html doc over another html doc
        cy.frameLoaded('#courses-iframe') //load cypress object 
        

        //find the elements at first index with 'mentorship' 
        cy.iframe().find("a[href*='mentorship']").eq(0).click() //swtich to iframe mode to see objects in frame
        
        cy.iframe().find("h1[class*='pricing-title']").should('have.length',2) //find if 2 packages are present        


        })
        
    }   
)
    