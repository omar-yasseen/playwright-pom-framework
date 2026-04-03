import { Page } from "@playwright/test";

export class InventoryPage {
    constructor(readonly page: Page){}
    
    async addItems(itemName: string){
        await this.page.getByTestId(`add-to-cart-${itemName}`).click();
    }
    async removeItems(itemName: string){
        await this.page.getByTestId(`remove-${itemName}`).click();
    }
}