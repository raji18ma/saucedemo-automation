import { Page,Locator,expect } from "@playwright/test";

export default class loginpage{
        
    readonly userName:Locator;
    readonly password:Locator;
    readonly submitButton:Locator;
    readonly productTitle:Locator;

    //invalid test
    readonly userNameError:Locator;
    readonly passwordError:Locator;
    

    constructor(private page :Page)
    {
     
     this.userName = page.getByPlaceholder("Username");
     this.password = page.getByRole('textbox', { name: 'password' });
     this.submitButton = page.getByRole('button',{name:'Login'});
     this.productTitle = page.getByText('Products');
     this.userNameError = page.getByText('Epic sadface: Username is required');
     this.passwordError = page.getByText('Epic sadface: Password is required');
    }

    async login(userName : string,password : string)
    {
        await this.page.waitForLoadState();
        await this.page.goto("https://www.saucedemo.com/");
        await this.page.waitForTimeout(2000);
        await this.userName.waitFor();
        await this.password.waitFor();
        await this.page.waitForLoadState();
        await this.userName.isVisible();
        await this.userName.fill(userName);
        await this.password.fill(password);
        await this.submitButton.click();
        await this.productTitle.waitFor();
    }

    async invalid(userName : string,password : string)
    {
        await this.page.waitForLoadState();
        await this.page.goto("https://www.saucedemo.com/");
        await this.page.waitForTimeout(2000);
        await this.submitButton.click();
        await this.userNameError.waitFor();
        await this.userName.isVisible;
        await this.userName.pressSequentially(userName);
        await this.submitButton.click();
        await this.passwordError
        await this.password.fill(password);
        await this.submitButton.click();
    }


}