import { Page,Locator,expect } from "@playwright/test";
let priceone :any;
let priceFirstProduct : any;
let pricelast:any;
let priceLastProduct : any;


export default class productPage{
        
    readonly shoppingCartLink:Locator;
    readonly removeButton:Locator;
    readonly checkoutButton:Locator;
    readonly continueShopping:Locator;
    readonly yourCartHeader:Locator;

    //Filter verification
    readonly selectFilter:Locator;
    readonly productZtoA:Locator;
    readonly productlohi:Locator;

    //Add to cartProduct
    readonly labbackpackAdd:Locator;
    readonly pricelabbackpack:Locator;
    readonly lastproductAdd:Locator;
    readonly pricelastprodcutAdd:Locator;

    //verify cart
    readonly firstProductName:Locator;
    readonly lastproductName:Locator;
    readonly priceFirstProduct:Locator;
    readonly pricelastproduct:Locator;
    readonly viewProduct:Locator;
    readonly viewfirstProductPrice:Locator;
   
    //Checkout Information
    readonly firstName:Locator;
    readonly lastName:Locator;
    readonly postalCode:Locator;
    readonly continueButton:Locator;
    
    //checkout overview
    readonly paymentInformation:Locator;
    readonly shippingInformation:Locator;
    readonly priceTotal:Locator;
    readonly itemTotal:Locator;
    readonly finsihButton:Locator;
    
 //Checkout Information error
    readonly firstNameError:Locator;
    readonly postalCodeError:Locator;
    
    constructor(private page:Page)
    {
        this.shoppingCartLink = page.locator('.shopping_cart_link');
        this.removeButton =page.getByText('Remove');
        this.checkoutButton= page.getByRole('button',{name:'Checkout'})
        this.continueShopping = page.getByAltText('Go back');
        this.yourCartHeader=page.getByText('Your Cart');
        this.selectFilter = page.locator("//select[@class='product_sort_container']");
        this.productZtoA = page.getByText('Test.allTheThings() T-Shirt (Red)');
        this.productlohi = page.getByText('Sauce Labs Onesie');
        this.labbackpackAdd=page.locator('[id="add-to-cart-sauce-labs-backpack"]');
        this.pricelabbackpack = page.locator("//button[@id='remove-sauce-labs-backpack']/preceding::div[@class='inventory_item_price']")
        this.lastproductAdd = page.locator("//div[text()='Test.allTheThings() T-Shirt (Red)']//following::button[text()='Add to cart']");
        this.pricelastprodcutAdd = page.locator("//div[text()='Test.allTheThings() T-Shirt (Red)']//following::div[@class='inventory_item_price']");
        this.firstProductName = page.locator("//button[@id='remove-sauce-labs-backpack']/preceding::div[@class='inventory_item_name']");
        this.lastproductName = page.locator("//div[@class='inventory_item_name']");
        this.priceFirstProduct = page.locator("//div[@class='inventory_item_price']");
        this.pricelastproduct = page.locator("//div[@class='inventory_item_price']");  
        this.viewProduct = page.locator("//div[@class='inventory_details_name large_size']");
        this.viewfirstProductPrice = page.locator("//div[@class='inventory_details_price']");
        this.firstName = page.getByPlaceholder('First Name');
        this.lastName = page.getByPlaceholder('Last Name');
        this.postalCode = page.getByPlaceholder('Zip/Postal Code');
        this.continueButton = page.getByRole('button' ,{name:'continue'});
        this.paymentInformation = page.getByText('Payment Information:');
        this.shippingInformation = page.getByText('Shipping Information:');
        this.priceTotal = page.getByText('Price Total');
        this.itemTotal = page.locator("//div[@class='summary_subtotal_label']");
        this.finsihButton = page.getByRole('button' ,{name:'finish'});
        this.firstNameError = page.getByText('Error: First Name is required');
        this.postalCodeError = page.getByText('Error: Postal Code is required');
    }
    async verifyEmptyCart() 
    {
        await this.shoppingCartLink.isVisible();
        await this.shoppingCartLink.click();
        await this.yourCartHeader.waitFor();
        await this.yourCartHeader.isVisible();
        await expect(this.removeButton).not.toBeVisible();
        await this.continueShopping.waitFor();
        await this.continueShopping.click();

    }
    async VerifyFilter()
    {
        await this.selectFilter.waitFor();
        await this.selectFilter.selectOption({label : 'Name (Z to A)'});
        await this.productZtoA.waitFor();
        await this.productZtoA.isVisible();
        await this.selectFilter.selectOption({value: 'lohi'});
        await this.productlohi.waitFor();
        await this.productlohi.isVisible();
        await this.selectFilter.selectOption({index: 0});
      
    }

    async addToCart()
    {
        await expect(this.removeButton).not.toBeVisible();
        await this.labbackpackAdd.click();
        await this.pricelabbackpack.waitFor();
        priceFirstProduct= await this.pricelabbackpack.textContent();
        priceone = priceFirstProduct.split("$");
        await this.removeButton.isVisible();
        await this.page.mouse.wheel(0, 100);
        await this.pricelastprodcutAdd.scrollIntoViewIfNeeded();
        priceLastProduct = await this.pricelastprodcutAdd.innerText();
        pricelast = priceLastProduct.split("$");
        await this.lastproductAdd.click();
        
    }

    async verifyCartDetails(firstPro:string ,lastPro:string)
    {
        await this.shoppingCartLink.scrollIntoViewIfNeeded();
        await this.shoppingCartLink.click();
        await this.firstProductName.click();
        expect(await this.viewProduct.innerText()).toEqual(firstPro);
        expect(await this.viewfirstProductPrice.innerText()).toEqual(priceFirstProduct)
        await this.shoppingCartLink.click();
        console.log(await this.pricelastproduct.nth(1).innerText())
        expect(await this.lastproductName.nth(1).innerText()).toEqual(lastPro);
        expect(await this.pricelastproduct.nth(1).innerText()).toEqual(priceLastProduct);
        await this.checkoutButton.click();
    }

    async verifyCheckoutInformation(firstName:string,lastName:string,pinCode:string)
    {
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.postalCode.fill(pinCode);
        await this.continueButton.click();
    }

    async VerifyCheckOutOverview(firstPro:string ,lastPro:string)
    {

        await this.paymentInformation.isVisible();
        await this.shippingInformation.isVisible();
        await this.priceTotal.isVisible();
        await this.itemTotal.isVisible();
        expect(await this.lastproductName.first().innerText()).toEqual(firstPro);
        expect(await this.lastproductName.nth(1).innerText()).toEqual(lastPro);
        await this.finsihButton.click();

    }

    async verifyerrorInCheckoutInformation(firstName:string,lastName:string,pinCode:string)
    {
        await this.continueButton.click();
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.continueButton.click();
        await this.postalCode.fill(pinCode);
        await this.continueButton.click();
    }
}
