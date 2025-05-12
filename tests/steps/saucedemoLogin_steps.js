const { When, Then, Given, } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const assert = require('assert');
const {selectors} = require('../fixtures/saucedemoSelectors')
const { After } = require('@cucumber/cucumber');

let browser;
let page;

// Ana Sayfa
Given('Ana sayfaya gidiyorum', async () => {
    browser = await chromium.launch({ headless: true });
    page = await browser.newPage();
    await page.goto(selectors.SaucedemoUrl);
});

// Giriş Yapma
When('Geçerli kullanıcı adı ve şifre ile giriş yapıyorum', async () => {
    await page.fill(selectors.usernameselector, selectors.username);
    await page.fill(selectors.passwordselector, selectors.password);
    await page.click(selectors.loginButton);
});

// Envanter Sayfası Doğrulama
Then('Envanter sayfasına yönlendirildiğimi doğrula', async () => {
    await page.waitForSelector(selectors.inventorylist);
    const inventoryListElement = await page.$(selectors.inventorylist);
    const isVisible = await inventoryListElement.isVisible();
    assert.strictEqual(isVisible, true, 'Envanter listesi elementi görünür değil');
});

// Çıkış Yapma
When('Hesabımdan çıkış yapıyorum', async () => {

    await page.evaluate(() => {
        document.querySelector('#react-burger-menu-btn').click();
    });

    await page.waitForTimeout(1000);

    await page.evaluate(() => {
        document.querySelector('#logout_sidebar_link').click();
    });

});

// Giriş Sayfası Doğrulama
Then('Giriş sayfasına yönlendirildiğimi doğrula', async () => {
    await page.waitForSelector(selectors.loginwrapper);
    const loginElement = await page.$(selectors.loginwrapper);
    const isVisible = await loginElement.isVisible();
    assert.strictEqual(isVisible, true, 'Giriş formu elementi görünür değil');
});

// Hatalı Giriş Yapma
When('Geçersiz kullanıcı adı ve şifre ile giriş yapıyorum', async () => {
    await page.fill(selectors.usernameselector, selectors.invalidusername);
    await page.fill(selectors.passwordselector, selectors.invalidpassword);
    await page.click(selectors.loginButton);
    await page.waitForTimeout(1000);
});

// Hata Mesajı Doğrulama
Then('Hata mesajını gördüğümü doğrula', async () => {
    const errorMessageElement = await page.locator(selectors.error_message);
    const isVisible = await errorMessageElement.isVisible();
    const errorMessageText = await errorMessageElement.textContent();
    assert.strictEqual(isVisible, true, 'Hata mesajı elementi görünür değil');
    assert.strictEqual(errorMessageText.trim(), selectors.error_message_text);
    await page.waitForTimeout(1000);
});

After(async function () {
  if (browser) {
    await browser.close();
  }
});


