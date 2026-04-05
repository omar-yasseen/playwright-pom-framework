import { Page, Locator } from "@playwright/test";
import { CheckoutInfoPage } from "./CheckoutInfoPage"; 
import { InventoryPage } from "./InventoryPage";

export class CartPage{
    
    readonly removeBackpackBtn: Locator;
    readonly checkoutBtn: Locator;
    readonly continueShoppingBtn: Locator;
    readonly itemName: Locator;

    constructor(readonly page: Page){
        this.removeBackpackBtn = page.getByTestId("remove-sauce-labs-backpack");
        this.checkoutBtn = page.getByTestId("checkout");
        this.continueShoppingBtn = page.getByTestId("continue-shopping");
        this.itemName = page.getByTestId("inventory-item-name");
    }
    async removeFromCheckout(){
        await this.removeBackpackBtn.click();
    }
    async proceedToCheckoutInfo(){
        await this.checkoutBtn.click();
        return new CheckoutInfoPage(this.page);
    }
    async continueShoppingCheckout(){
        await this.continueShoppingBtn.click();
        return new InventoryPage(this.page);
    }

}