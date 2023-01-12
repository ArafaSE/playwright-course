import { chromium, test, expect } from "@playwright/test"

import HomePage from "../pages/Home.page";
import LoginPage from "../pages/Login.page";

let browser, page, homePage, loginPage;

test.beforeEach(async () => {
    browser = await chromium.launch();
    page = await browser.newPage();

    homePage = new HomePage(page);
    loginPage = new LoginPage(page);

    await homePage.navigate();
});

test.afterEach(async () => {
    await page.close();
    await browser.close();
})

test.describe('Login user', async () => {
    test("Login user with correct email and password", async () => {
        await homePage.clickHeaderLink(' Signup / Login');
        await loginPage.login('mohamed222@gmail.com', 'Password123')
        await expect(page.getByText(' Logged in as Mohamed')).toBeVisible();
    });
    
    test("Login user with incorrect email and password", async () => {
        await homePage.clickHeaderLink(' Signup / Login');
        await loginPage.login('hamada@gmail.com', 'Password123');
        await expect(page.getByText('Your email or password is incorrect!')).toBeVisible();
    });
});
