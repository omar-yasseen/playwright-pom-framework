import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { CartPage } from "../pages/CartPage";

let cartPage: CartPage;

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto("/");

    const inventoryPage = await loginPage.performLogin("standard_user");
    await inventoryPage.addItems("sauce-labs-backpack");

    cartPage = await inventoryPage.goToCart();
});

test(`remove an item from a checkout cart`, async () => {
        await cartPage.removeFromCheckout();
        await expect(cartPage.itemName).not.toBeVisible();
    });

test(`proceed to checkout`, async ({ page }) => {
        await cartPage.proceedToCheckoutInfo();
        await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-one.html");
    });

test(`continue shopping`, async ({ page }) => {
        await cartPage.continueShoppingCheckout();
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    });