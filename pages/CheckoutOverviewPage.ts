import { Page, Locator } from "@playwright/test";

export class CheckoutOverviewPage {
    readonly itemName: Locator;
    readonly subtotalLabel: Locator;
    readonly taxLabel: Locator;
    readonly totalLabel: Locator;
    readonly finishBtn: Locator;

    constructor(readonly page: Page) {
        this.itemName = page.getByTestId("inventory-item-name");
        this.subtotalLabel = page.getByTestId("subtotal-label");
        this.taxLabel = page.getByTestId("tax-label");
        this.totalLabel = page.getByTestId("total-label");
        this.finishBtn = page.getByTestId("finish");
    }

    async finishCheckout() {
        await this.finishBtn.click();
    }
}
