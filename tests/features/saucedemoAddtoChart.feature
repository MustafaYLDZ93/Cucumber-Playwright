@saucedemo
@addtochart

Feature: 2-Sepete Ekle

  Scenario: 2-Successful login and logout
    Given I am on the login page
    When I login with valid credentials
    Then I should see the inventory list
    When I logout

  Scenario: 2-Add item to cart and verify
    Given I am on the login page
    When I login with valid credentials
    When I add the first item to the cart
    Then the cart badge should display "1"
    Then I should see the item in the cart
