const { Given, When, Then, After } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const chai = require('chai'); // Named import yerine require kullanımı
const { selectors } = require('../fixtures/PlaywrightAssertionSelectors.js');

const expect = chai.expect;

let page;
let browser;

Given('I navigate to the Playwright homepage', async () => {
    browser = await chromium.launch({ headless: true });
    page = await browser.newPage();
    await page.goto(selectors.baseUrl);
});

Then('I should see the banner', async () => {
    const banner = await page.getByRole(selectors.banner);
    expect(await banner.isVisible()).to.be.true;
});

Then('the banner should contain the text {string}', async (text) => {
    const banner = await page.getByRole(selectors.banner);
    const bannerText = await banner.textContent();
    expect(bannerText).to.include(text);
});

When('I click on the {string} link', async (linkText) => {
    await page.getByRole('link', { name: linkText }).click();
});

Then('I should see the Installation header', async () => {
    const installationHeader = await page.locator(selectors.installationHeader);
    const headerText = await installationHeader.textContent();
    expect(headerText).to.include('Installation');
});

Then('I should see the Docs sidebar', async () => {
    const docsSidebar = await page.getByLabel(selectors.docsSidebar);
    expect(await docsSidebar.isVisible()).to.be.true;
});

Then('I should see the IntroductionInstalling text', async () => {
    const introText = await page.getByText(selectors.introductionText);
    expect(await introText.isVisible()).to.be.true;
});

After(async function () {
    if (browser) {
        await browser.close();
    }
});