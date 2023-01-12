import { chromium, test, expect } from "@playwright/test"

import HomePage from "../pages/Home.page";
import LoginPage from "../pages/Login.page";
import SignupPage from "../pages/Signup.page";
import AccountCreatedPage from "../pages/Account_created.page";

let browser, page, homePage, loginPage, sigupPage, accountCreatedPage;

test.beforeEach(async () => {
    browser = await chromium.launch();
    page = await browser.newPage();

    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    sigupPage = new SignupPage(page);
    accountCreatedPage = new AccountCreatedPage(page);

    await homePage.navigate();
});

test.afterEach(async () => {
    await page.close();
    await browser.close();
})

test.describe('Register user', async () => {
    test("Register user with new email address", async () => {
        await homePage.clickHeaderLink(' Signup / Login');
        await expect(page.getByText('New User Signup!')).toBeVisible();
        await loginPage.signup('Mohamed', (Math.random() + 1).toString(36).substring(2) + "@gmail.com");
        await expect(page.getByText('ENTER ACCOUNT INFORMATION')).toBeVisible();
        await sigupPage.fillAccountEnformationData();
        await expect(accountCreatedPage.accountCreatedTxt).toBeVisible();
        await accountCreatedPage.getContinuBtn.click();
        await expect(await homePage.getElementByText(' Logged in as Mohamed')).toBeVisible();
        await homePage.deleteAccountBtn.click();
        await expect(page.getByText('ACCOUNT DELETED!')).toBeVisible();
    });
    
    test("Register user with existing email address", async () => {
        
    });
});
