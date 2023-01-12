import { chromium, test, expect } from "@playwright/test"

import HomePage from "../pages/Home.page";
import LoginPage from "../pages/Login.page";
import ProductDetailsPage from "../pages/Product-details.page";
import ProductsPage from "../pages/Products.page";

let browser, page, homePage, loginPage, productsPage, productDetailsPage;

test.beforeEach(async () => {
    browser = await chromium.launch();
    page = await browser.newPage();

    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page)
    productDetailsPage = new ProductDetailsPage(page)

    await homePage.navigate();
});

test.afterEach(async () => {
    await page.close();
    await browser.close();
})

test.describe.only('Product review', async () => {
    test("Add review on product", async () => {
        await homePage.clickHeaderLink(' Signup / Login');
        await loginPage.login('mohamed222@gmail.com', 'Password123')
        await expect(page.getByText(' Logged in as Mohamed')).toBeVisible();

        await homePage.clickHeaderLink('Products');
        await expect(page).toHaveURL('https://automationexercise.com/products');

        await productsPage.reviewProduct(0);
        await expect(page.getByText('Write Your Review')).toBeVisible();

        await productDetailsPage.writeReview('Mohamed', 'mohamed222@gmail.com', 'Perfect material with good price, Thanks!')
        await expect(page.getByText("Thank you for your review.")).toBeVisible();
    });
});
