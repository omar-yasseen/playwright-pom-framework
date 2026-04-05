import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";

let inventoryPage: InventoryPage;

const itemsToTest = [
    "sauce-labs-backpack",
    "sauce-labs-bike-light",
    "sauce-labs-bolt-t-shirt"
];

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto("/");
    inventoryPage = await loginPage.performLogin("standard_user"); 
});

for (const item of itemsToTest) {
    test(`remove ${item} from cart`, async () => {
        await inventoryPage.addItems(item);
        await inventoryPage.removeItems(item);
        await expect(inventoryPage.cartBadge).not.toBeVisible();
    });
}

for (const item of itemsToTest) {
    test(`add ${item} to cart`, async () => {
        await inventoryPage.addItems(item);
        await expect(inventoryPage.cartBadge).toHaveText("1");
    });
}