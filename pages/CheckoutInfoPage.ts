import { Page, Locator } from "@playwright/test";
import { CartPage } from "./CartPage";
//import { CheckoutOverview } from "./CheckoutOverviewPage";

export class CheckoutInfoPage{
    readonly errorMessage: Locator;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly postalCode: Locator;
    readonly checkoutOverviewBtn: Locator;
    readonly cancelBtn: Locator;

    constructor(readonly page: Page){
        this.errorMessage = page.getByTestId("error");
        this.firstName = page.getByTestId("firstName");
        this.lastName = page.getByTestId("lastName");
        this.postalCode = page.getByTestId("postalCode");
        this.checkoutOverviewBtn = page.getByTestId("continue");
        this.cancelBtn = page.getByTestId("cancel");
        
    }

    async fillInfo(first: string, last: string, postal: string){
        await this.firstName.fill(first);
        await this.lastName.fill(last);
        await this.postalCode.fill(postal)
    }

    async continueToCheckoutOverview(){
        await this.checkoutOverviewBtn.click();
        //return new CheckoutOverview(this.page);
    }

    async pressCancel(){
        await this.cancelBtn.click();
        return new CartPage(this.page);
    }

}