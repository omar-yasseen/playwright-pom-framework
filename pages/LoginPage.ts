import { Page } from "@playwright/test";

export class LoginPage{
    constructor(readonly page:Page){
    }

    async performLogin(username: string, password: string = "secret_sauce"){
        await this.page.getByTestId("username").fill(username);
        await this.page.getByTestId("password").fill(password);
        await this.page.getByTestId("login-button").click();
    }
}