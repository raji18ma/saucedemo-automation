import{test,expect,Browser,Page} from '@playwright/test'
import{webkit,chromium,firefox} from 'playwright'
import LoginPage from '../pageObject/loginpage'
import ProductPage from '../pageObject/productPage'
import * as credetials from "../test_data/userCredetials.json"
import * as product from "../test_data/product.json"

/*
  Test Case 1 - Verify of login page
  Test Case 2 - Verify of product page by filtering the product
  Test Case 3 - Verify Add to Cart
  Test Case 4 - Verify Your cart Page and asseration.
  Test Case 5 - Verify Checkout Your Information page
  Test Case 6 - Verify the product and finsh the flow

  all  the above test case are covered as a single E2E flow
  */


test('login test',async()=>
{
    const browser:Browser = await chromium.launch();
    const page:Page = await browser.newPage();
    const loginPage = new LoginPage(page);
    await loginPage.login(credetials.username,credetials.password);
    const productPage = new ProductPage(page);
    await productPage.verifyEmptyCart();
    await productPage.VerifyFilter();
    await productPage.addToCart();
    await productPage.verifyCartDetails(product.firstProduct,product.lastProduct);
    await productPage.verifyCheckoutInformation(credetials.firstName,credetials.LastName,credetials.postalCode);
    await productPage.VerifyCheckOutOverview(product.firstProduct,product.lastProduct);
    await browser.close();


});






