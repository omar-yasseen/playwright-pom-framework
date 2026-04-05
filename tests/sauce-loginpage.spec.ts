import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

let login: LoginPage;

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    await page.goto("/");
});

test("login auth", async ({ page }) => {
    await login.performLogin("standard_user");
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
});

test("failed login", async () => {
    await login.performLogin("locked_out_user");
    await expect(login.errorMessage).toHaveText("Epic sadface: Sorry, this user has been locked out.");
});