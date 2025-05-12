const { Given, When, Then, } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { chromium } = require('playwright');
const {selectors} = require('../fixtures/PlaywrightAssertionSelectors')
const { After } = require('@cucumber/cucumber');


let page;
let browser;


Given('I navigate to the Playwright homepage', async function () {
    browser = await chromium.launch({ headless: true });
    page = await browser.newPage();
    await page.goto(selectors.baseUrl);
});

Then('I should see the banner', async function () {
    await expect(page.getByRole(selectors.banner)).toBeVisible();
});

Then('the banner should contain the text {string}', async function (text) {
    await expect(page.getByRole(selectors.banner)).toContainText('Get started');
});

When('I click on the {string} link', async function (linkText) {
    await page.getByRole('link', { name: 'Get started' }).click();
});

Then('I should see the Installation header', async function () {
    await expect(page.locator(selectors.installationHeader)).toContainText('Installation');

});

Then('I should see the Docs sidebar', async function () {
    await expect(page.getByLabel(selectors.docsSidebar)).toBeVisible();
});

Then('I should see the IntroductionInstalling text', async function () {
    await expect(page.getByText(selectors.introductionText)).toBeVisible();
});

After(async function () {
    if (browser) {
        await browser.close();
    }
}
);