
import { Page, Locator } from "@playwright/test";
import { CartPage } from "./CartPage";

export class InventoryPage {
    readonly cartLink: Locator;
    readonly cartBadge: Locator;

    constructor(readonly page: Page) {
        this.cartLink = page.getByTestId('shopping-cart-link');
        this.cartBadge = page.getByTestId('shopping-cart-badge');
    }
    
    async addItems(itemName: string) {
        await this.page.getByTestId(`add-to-cart-${itemName}`).click();
    }

    async removeItems(itemName: string) {
        await this.page.getByTestId(`remove-${itemName}`).click();
    }

    async goToCart() {
        await this.cartLink.click(); 
        return new CartPage(this.page); 
    }
}