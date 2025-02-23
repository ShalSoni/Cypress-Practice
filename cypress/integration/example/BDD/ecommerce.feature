Feature: End-to-End ecommerce validation

    Application Regression
    @Regression
    Scenario: Ecommerce products delivery
    Given I open Ecommerce page 
    When I add items to cart
    When Validate the total prices
    Then Select the country, Submit and verify success messsage

    @Smoke
    Scenario: Fill form details to shop
    Given I open Ecommerce page 
    When I fill the form details
    |name    |gender |
    |smith   |Male   |
    Then Validate the form behavior
    Then Select the Shop page