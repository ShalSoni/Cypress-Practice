

let productName

describe('JWT Session', ()=>{
    it('Purchase order and download csv', async () =>
    { 
        cy.LoginAPI().then(function() //defined in commands.js
        {
        cy.visit('https://rahulshettyacademy.com/client', //skips login page
            {//set options to inject token from local staorage
                onBeforeLoad : function(window)
                {
                    window.localStorage.setItem('token',Cypress.env('token')) //set token value on local storage for automatic login in session
                }
            })
        }) //explicit promise resolve as its a custom command
        cy.get(".card-body b").eq(1).then(function(ele)
      {
      productName =  ele.text();
      })

    cy.get(".card-body button:last-of-type").eq(1).click(); //select last button of class for product at 1st index
    
    cy.get("[routerlink*='cart']").click(); //click add to cart
    cy.wait(10000) 
    cy.contains('Checkout').click() //based on text select button
    cy.get("[placeholder*='Country']").type('ind')
    cy.get(".ta-results button").each(($el,index,$list)=> 
        {
         if($el.text === " India"){
            cy.wrap($e1).click() 
        }
    })
    cy.get('.action_submit').click()
    cy.wait(2000) //this app csv takes time to load, so wait is applied
    cy.get('.order-summary button').contains("Excel").click()

     //cypress global object to dynamically 
    const filePath = Cypress.config("fileServerFolder")+"/cypress/downloads/order-invoice_shalz.soni.xlsx"
    
    cy.task('excelToJsonConverter',filePath).then(function(result)
    {        
        console.log(result.data[1].A) //read orderID
        expect(productName).to.equal(result.data[1].B) //assertion for product name; plugin verifies with exact position 
    
        
    }) 
                //OR
                
    cy.readFile(filePath).then(function(text) //does not require any plugin, not preferable as position not verified
    {
        expect(text).to.include(productName) //check if the text contains product name when exact position pf product is not known
    }) //reads file and yeilds the entire content of file as text  
   
    })
    
  })