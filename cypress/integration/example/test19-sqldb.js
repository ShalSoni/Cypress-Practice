/// <reference types="Cypress" />

describe('My eighteenth Test Suite', function() 
{

it('Database interaction',function() {
    cy.log("hello")
    cy.sqlServer("select * from Person").then(function(result)
    {
        console.log(result[0][1])
    })
})

})
