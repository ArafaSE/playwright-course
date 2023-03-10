import { test, expect } from "@playwright/test"

import HomePage from "../pages/Home.page";
import LoginPage from "../pages/Login.page";
import ProductDetailsPage from "../pages/Product-details.page";
import ProductsPage from "../pages/Products.page";

let homePage, loginPage, productsPage, productDetailsPage;

test.beforeEach(async ({page}) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page)
    productDetailsPage = new ProductDetailsPage(page)
});

test.describe('Product review', async () => {
    test("Add review on product", async ({page, baseURL}) => {
        // 1. Login to your account 
        await loginPage.navigate();
        await loginPage.login(process.env.LOGIN_EMAIL, process.env.LOGIN_PASSWORD);
        // 2. Clcik on 'products' button from page header
        await homePage.clickHeaderLink('Products');
        // 3. verify the user redirected into '/products' url
        await expect(page).toHaveURL(baseURL + '/products');
        // 4. Click on 'Review product' btn for first product
        await productsPage.reviewProduct(0);
        // 5. verify that 'Write Your Review' text displayed
        await expect(page.getByText('Write Your Review')).toBeVisible();
        // 6. Addd review by filling 'name, email, and review' inputs, then submit the review 
        await productDetailsPage.writeReview(process.env.LOGIN_NAME, process.env.LOGIN_EMAIL, 'Perfect material with good price, Thanks!')
        // 7. verify that success msg displayed as 'Thank you for your review.'
        await expect(page.getByText("Thank you for your review.")).toBeVisible();
    });
});
