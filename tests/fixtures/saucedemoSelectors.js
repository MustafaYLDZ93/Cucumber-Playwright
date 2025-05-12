const saucedemoSelectors = {
    SaucedemoUrl: 'https://www.saucedemo.com',
    usernameselector: '#user-name',
    username: 'standard_user',
    invalidusername: 'invalid_user',
    passwordselector: '#password',
    password: 'secret_sauce',
    invalidpassword: 'invalid_password',
    loginButton: '#login-button',
    inventorylist: '.inventory_list',
    logoutmenu: '.bm-burger-button',
    logoutlink: '#logout_sidebar_link',
    loginwrapper: "div[class='login_wrapper-inner']",
    error_message: '[data-test="error"]',
    error_message_text: 'Epic sadface: Username and password do not match any user in this service',
    cartBadgeSelector: '.shopping_cart_badge',
    cartlink: '.shopping_cart_link',
    cartItemSelector: '.cart_item',
    inventoryItemName: '.inventory_item_name',
    buttonAddCart:".btn_primary",
    inventoryItem: '.inventory_item',

};

module.exports = { selectors: saucedemoSelectors };
