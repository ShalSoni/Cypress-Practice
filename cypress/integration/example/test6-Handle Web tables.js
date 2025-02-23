describe('My sixth test suite',function(){
    it('My sixth test case', function() 
    {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/');
        cy.get('tr td:nth-child(2)').each(($el, index, $list) => { //finding value in second column of tabel
           
            const text = $el.text() 
            if (text.includes('Python')) 
            {
                //retrives index at which "python" text is present; move to sibling element
                cy.get('tr td:nth-child(2)').eq(index).next().then(function(price)
                    {
                        const priceText = price.text()
                        expect(priceText).to.equal('25')
                    } 
                
                    //dynamically retrieve sibling column

                )
                
            }}
        )
        })
        
    }   
)
    