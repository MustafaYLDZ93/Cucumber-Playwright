@playwrightassertion
Feature: Playwright website test

  Scenario: Verify Playwright website content
    Given I navigate to the Playwright homepage
    Then I should see the banner
    Then the banner should contain the text "Get started"
    When I click on the "Get started" link
    Then I should see the Installation header
    Then I should see the Docs sidebar
    Then I should see the IntroductionInstalling text
