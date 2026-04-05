import { Page, Locator } from "@playwright/test";
import { CartPage } from "./CartPage";

export class CheckoutInfoPage{
    readonly continueButton: Locator;
    readonly errorMessage: Locator;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly postalCode: Locator;
    readonly checkoutOverviewBtn: Locator;

    constructor(readonly page: Page){
        this.continueButton = page.getByTestId("continue");
        this.errorMessage = page.getByTestId("error");
        this.firstName = page.getByTestId("firstName");
        this.lastName = page.getByTestId("lastName");
        this.postalCode = page.getByTestId("postalCode");
        this.checkoutOverviewBtn = page.getByTestId("continue");
    }

    async fillFirstName(first: string){
        await this.firstName.fill(first);
    }

    async fillLastName(last: string){
        await this.lastName.fill(last);
    }

    async fillPostalCode(code: string){
        await this.postalCode.fill(code);
    }

    async continueToCheckoutOverview(code: string){
        await this.checkoutOverviewBtn.click();
        return new CartPage(this.page);
    }

}