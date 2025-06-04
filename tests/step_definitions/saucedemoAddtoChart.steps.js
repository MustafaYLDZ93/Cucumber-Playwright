const { When, Then, Given, After } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const assert = require('assert');
const { selectors } = require('../fixtures/saucedemoSelectors.js');



let browser;
let page;

Given('I am on the login page', async () => {
    browser = await chromium.launch({ headless: true });
    page = await browser.newPage();
    await page.goto(selectors.SaucedemoUrl);
});

When('I login with valid credentials', async () => {

    await page.fill(selectors.usernameselector, selectors.username);
    await page.fill(selectors.passwordselector, selectors.password);
    await page.click(selectors.loginButton);
});

Then('I should see the inventory list', async () => {
    const isSuccess = await page.isVisible(selectors.inventorylist);
    assert.strictEqual(isSuccess, true, 'Inventory list is not visible');
});

When('I logout', async () => {
    await page.click(selectors.logoutmenu);
    const isLogoutVisible = await page.isVisible(selectors.logoutlink);
    if (isLogoutVisible) {
        await page.click(selectors.logoutlink);
    } else {
        throw new Error('Logout link is not visible');
    }
});

When('I add the first item to the cart', async () => {
    const addToCartButtonSelector = '.inventory_item:first-of-type .btn_inventory';
    await page.click(addToCartButtonSelector);
});

Then('the cart badge should display {string}', async (expectedText) => {
    const cartBadgeVisible = await page.isVisible(selectors.cartBadgeSelector);
    assert.strictEqual(cartBadgeVisible, true, 'Cart badge is not visible');
    const cartBadgeText = await page.textContent(selectors.cartBadgeSelector);
    assert.strictEqual(cartBadgeText, expectedText, `Cart badge text is not "${expectedText}"`);
});

Then('I should see the item in the cart', async () => {
    await page.click(selectors.cartlink);
    const cartItemVisible = await page.isVisible(selectors.cartItemSelector);
    assert.strictEqual(cartItemVisible, true, 'No product found in the cart');
});

After(async function () {
  if (browser) {
    await browser.close();
  }
});

