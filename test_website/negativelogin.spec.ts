import{test,expect,Browser,Page} from '@playwright/test'
import{webkit,chromium,firefox} from 'playwright'
import LoginPage from '../pageObject/loginpage'
import ProductPage from '../pageObject/productPage'
import * as credetials from "../test_data/userCredetials.json"
import * as product from "../test_data/product.json"

/*
  Test Case 1 - Verify of login page by not providing the value in the input filed
  Test Case 2 - Verify of product page by filtering the product and Verify Add to Cart
  Test Case 3 - Verify the checkOut paage by not providing the value in the input filed
  
  all  the above test case are covered as a single E2E flow
  */


test('negative test',async()=>
{
    const browser:Browser = await chromium.launch();
    const page:Page = await browser.newPage();
    const loginPage = new LoginPage(page);
    await loginPage.invalid(credetials.username,credetials.password);
    const productPage = new ProductPage(page);
    await productPage.addToCart();
    await productPage.verifyCartDetails(product.firstProduct,product.lastProduct);
    await browser.close();
});






