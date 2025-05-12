const { Given, When, Then, After } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const { selectors } = require('../fixtures/PlaywrightAssertionSelectors.js');
const assert = require('assert');

let page;
let browser;

Given('I navigate to the Playwright homepage', async () => {
    browser = await chromium.launch({ headless: true });
    page = await browser.newPage();
    await page.goto(selectors.baseUrl);
});

Then('I should see the banner', async () => {
    const banner = await page.getByRole(selectors.banner);
    const isVisible = await banner.isVisible();
    assert.strictEqual(isVisible, true, 'Banner should be visible');
});

Then('the banner should contain the text {string}', async (text) => {
    const banner = await page.getByRole(selectors.banner);
    const bannerText = await banner.textContent();
    assert.ok(bannerText.includes(text), `Expected banner text to include "${text}"`);
});

When('I click on the {string} link', async (linkText) => {
    await page.getByRole('link', { name: linkText }).click();
});

Then('I should see the Installation header', async () => {
    const installationHeader = await page.locator(selectors.installationHeader);
    const headerText = await installationHeader.textContent();
    assert.ok(headerText.includes('Installation'), 'Header should include "Installation"');
});

Then('I should see the Docs sidebar', async () => {
    const docsSidebar = await page.getByLabel(selectors.docsSidebar);
    const isVisible = await docsSidebar.isVisible();
    assert.strictEqual(isVisible, true, 'Docs sidebar should be visible');
});

Then('I should see the IntroductionInstalling text', async () => {
    const introText = await page.getByText(selectors.introductionText);
    const isVisible = await introText.isVisible();
    assert.strictEqual(isVisible, true, 'IntroductionInstalling text should be visible');
});

After(async function () {
    if (browser) {
        await browser.close();
    }
});
