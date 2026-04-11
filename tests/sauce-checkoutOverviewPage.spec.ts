import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { CheckoutOverviewPage } from "../pages/CheckoutOverviewPage";

let checkoutOverviewPage: CheckoutOverviewPage;

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto("/");

    const inventoryPage = await loginPage.performLogin("standard_user");
    await inventoryPage.addItems("sauce-labs-backpack");

    const cartPage = await inventoryPage.goToCart();

    const checkoutInfoPage = await cartPage.proceedToCheckoutInfo();
    await checkoutInfoPage.fillInfo("john", "larry", "1234");
    
    checkoutOverviewPage = await checkoutInfoPage.continueToCheckoutOverview();
});

test("verify correct item in checkout overview", async () => {
    await expect(checkoutOverviewPage.itemName).toHaveText("Sauce Labs Backpack");
});

test("verify item total plus tax equals final total", async () => {
    const subtotalText = await checkoutOverviewPage.subtotalLabel.innerText();
    const taxText = await checkoutOverviewPage.taxLabel.innerText();
    const totalText = await checkoutOverviewPage.totalLabel.innerText();

    const subtotal = parseFloat(subtotalText.replace(/[^0-9.]/g, ''));
    const tax = parseFloat(taxText.replace(/[^0-9.]/g, ''));
    const total = parseFloat(totalText.replace(/[^0-9.]/g, ''));

    expect(subtotal + tax).toBeCloseTo(total, 2);
});

test("finish checkout routes to confirmation screen", async ({ page }) => {
    await checkoutOverviewPage.finishCheckout();
    await expect(page).toHaveURL("https://www.saucedemo.com/checkout-complete.html");
});
