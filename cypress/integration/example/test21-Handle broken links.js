describe("Handle Broken Links", () =>
{
    it('Verify navigation across the page', () =>
    {
        let brokenLinks = 0
        let activeLinks = 0
        cy.get('a').each(($link,index) =>  //get all a tag attributes for links; href stores the link address
            {
            const href =  $link.attr('href') //find attribute value of href
            if (href) {
                cy.request({ url: href ,failOnStatusCode:false}).then((response) => { //access the url endpoint and retrieve response object
                    //failOnStatusCode will not fail the test case beacuse of the broken link
                    if (response.status >= 400) {
                        cy.log(`Link at index ${index +1} is broken - ${href}`) //print broken link with back tick
                        brokenLinks++ //count total links
                    }
                    else
                    {
                        cy.log('Link at index ${index +1} is active - ${href}')
                        activeLinks++ //count total links
                    }
            }) 
            }
        }).then(($links) => {
            const totalLinks = $links.length //total count of links on page
            cy.log(`Total links are ${totalLinks}`)
            cy.log(`Broken links are ${brokenLinks}`)
            cy.log(`Active links are ${activeLinks}`)
        })
    
    })
})