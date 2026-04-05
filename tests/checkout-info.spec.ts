import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { CheckoutInfoPage } from "../pages/CheckoutInfoPage";

let checkoutInfoPage: CheckoutInfoPage;

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto("/");

    const inventoryPage =  await loginPage.performLogin("standard_user");
    await inventoryPage.addItems("sauce-labs-backpack");

    const cartPage = await inventoryPage.goToCart();

    checkoutInfoPage = await cartPage.proceedToCheckoutInfo();
    
    
});

test("Checkout requires first name", async () => {
    await checkoutInfoPage.continueButton.click();
    await expect(checkoutInfoPage.errorMessage).toBeVisible();
});

test("Checkout requires first name", async () => {
    await checkoutInfoPage.continueButton.click();
    await expect(checkoutInfoPage.errorMessage).toBeVisible();
});