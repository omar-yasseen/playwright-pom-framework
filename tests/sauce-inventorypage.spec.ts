import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";


let loginPage: LoginPage;
let inventoryPage: InventoryPage;

const itemsToTest = ["sauce-labs-backpack",
    "sauce-labs-bike-light",
    "sauce-labs-bolt-t-shirt"];

test.beforeEach(async ({ page }) =>{
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await page.goto("/");
    await loginPage.performLogin("standard_user");
})

for (const item of itemsToTest){

test(`remove ${item} from cart`, async ({ page }) => {
    await inventoryPage.addItems(item);
    await inventoryPage.removeItems(item);
    await expect(page.getByTestId("shopping-cart-badge")).not.toBeVisible();
});
}

for( const item of itemsToTest){

test(`add ${item} to cart`, async ({ page }) => {
    await inventoryPage.addItems(item);
    await expect(page.getByTestId("shopping-cart-link")).toHaveText("1");
});
}