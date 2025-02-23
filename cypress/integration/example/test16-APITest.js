
 describe('JWT Session',function(){
    it('Access with token', function() 
    {//do validations on API response as per request without UI element check
        //cy.request(url)
        //cy.request(url, body)
        //cy.request(method, url)
        //cy.request(method, url, body)
        //cy.request(options)

        cy.request('http://216.10.245.166/Library/AddBook.php',
            {//body
                "name": "Learn Appium Automation with Java",
                "isbn": "bcdsss",
                "aisle": "22s7",
                "author": "John foe"
            }).then(function(response) //resolve promise and capture response
            {//validations code as per requirement
                expect(response.body).to.have.property('Msg',"successfully added")
                expect(response.isOkStatusCode)
            })
    })
  })