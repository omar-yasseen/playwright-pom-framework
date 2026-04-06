import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { CheckoutInfoPage } from "../pages/CheckoutInfoPage";

const errorScenarios = [
    { 
        testName: "missing first name", 
        firstName: "", lastName: "larry", zip: "1234", 
        expectedError: "Error: First Name is required" 
    },
    { 
        testName: "missing last name", 
        firstName: "john", lastName: "", zip: "1234", 
        expectedError: "Error: Last Name is required" 
    },
    { 
        testName: "missing postal code", 
        firstName: "john", lastName: "larry", zip: "", 
        expectedError: "Error: Postal Code is required" 
    }
];

let checkoutInfoPage: CheckoutInfoPage;

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto("/");

    const inventoryPage =  await loginPage.performLogin("standard_user");
    await inventoryPage.addItems("sauce-labs-backpack");

    const cartPage = await inventoryPage.goToCart();

    checkoutInfoPage = await cartPage.proceedToCheckoutInfo();
    
    
});

for (const scenario of errorScenarios) {

    test(`shows error for ${scenario.testName}`, async () => {
        
        await checkoutInfoPage.fillInfo(scenario.firstName, scenario.lastName, scenario.zip);
        await checkoutInfoPage.checkoutOverviewBtn.click();
        await expect(checkoutInfoPage.errorMessage).toHaveText(scenario.expectedError);
    });
}

test("continue to checkout overview", async ({ page }) => {
    await checkoutInfoPage.fillInfo("john", "larry", "1234");
    await checkoutInfoPage.continueToCheckoutOverview();
    await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-two.html");

});

test("press cancel to go back to cart", async ({ page }) => {
    await checkoutInfoPage.pressCancel();
    await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");
});
