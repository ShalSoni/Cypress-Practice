beforeEach( () =>
    {
        cy.fixture('example').then(function(data)  //filename under fixtures folder holding test data; resolve promise to access data using then
      {
        this.data=data //initialise golbal variable to be accessed everwhere outside block
      })
    })