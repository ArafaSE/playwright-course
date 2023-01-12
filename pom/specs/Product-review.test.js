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
    test("Add review on product", async ({page}) => {
        // 1. Login to your account 
        await loginPage.navigate();
        await loginPage.login('mohamed222@gmail.com', 'Password123')
        // 2. Clcik on 'products' button from page header
        await homePage.clickHeaderLink('Products');
        // 3. verify the user redirected into '/products' url
        await expect(page).toHaveURL(productsPage.baseUrl + '/products');
        // 4. Click on 'Review product' btn for first product
        await productsPage.reviewProduct(0);
        // 5. verify that 'Write Your Review' text displayed
        await expect(page.getByText('Write Your Review')).toBeVisible();
        // 6. Addd review by filling 'name, email, and review' inputs, then submit the review 
        await productDetailsPage.writeReview('Mohamed', 'mohamed222@gmail.com', 'Perfect material with good price, Thanks!')
        // 7. verify that success msg displayed as 'Thank you for your review.'
        await expect(page.getByText("Thank you for your review.")).toBeVisible();
    });
});
