import { When, Then, Given, After } from '@cucumber/cucumber';
import { chromium } from 'playwright';
import { selectors } from '../fixtures/saucedemoSelectors.js';
import assert from 'assert';
import { expect } from 'chai';




let browser; 
let page;

Given('kullanıcı Saucedemo ana sayfasına gider', async () => {
    browser = await chromium.launch({ headless: true });
    page = await browser.newPage();
    await page.goto(selectors.SaucedemoUrl);
});

When('kullanıcı adı ve şifre ile giriş yapıyorum', async () => {
    await page.fill(selectors.usernameselector, selectors.username);
    await page.fill(selectors.passwordselector, selectors.password);
    await page.click(selectors.loginButton);
});

When('tüm ürünleri sepete ekler', async () => {
    const urunler = await page.locator(selectors.inventoryItem).elementHandles();
    this.urunSayisi = urunler.length;

    for (let i = 1; i <= this.urunSayisi; i++) {
        const productNameElement = page.locator(`.inventory_item:nth-child(${i}) .inventory_item_name`);
        await productNameElement.click();
        await page.click(selectors.buttonAddCart);
        const cartBadge = page.locator(selectors.cartBadgeSelector);
        const badgeText = await cartBadge.innerText();
        assert.strictEqual(badgeText, `${i}`, `Sepetteki ürün sayısı ${i} olmalı`);
        await page.goBack();
    }
});

Then('sepetteki ürün sayısı doğrulanır', async () => {
    const cartBadge = page.locator(selectors.cartBadgeSelector);
    const badgeText = await cartBadge.innerText();
    assert.strictEqual(badgeText, `${this.urunSayisi}`, `Sepetteki ürün sayısı ${this.urunSayisi} olmalı`); // node.js assert
    expect(badgeText).to.equal(`${this.urunSayisi}`); // chai assert
});

After(async function () {
    if (browser) {
        await browser.close();
    }
}
);