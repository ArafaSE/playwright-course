import { test, expect } from "@playwright/test"

import HomePage from "../pages/Home.page";
import LoginPage from "../pages/Login.page";
import SignupPage from "../pages/Signup.page";
import AccountCreatedPage from "../pages/Account_created.page";

let homePage, loginPage, sigupPage, accountCreatedPage, randomEmail;

test.beforeEach(async ({page}) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    sigupPage = new SignupPage(page);
    accountCreatedPage = new AccountCreatedPage(page);
    
    randomEmail = (Math.random() + 1).toString(36).substring(2) + "@gmail.com";
    await loginPage.navigate();
});

test.describe('Register user', async () => {
    test("Register user with new email address @hp", async ({page}) => {
        // 1. From login page verify that 'New User Signup' text is visible
        await expect(page.getByText('New User Signup!')).toBeVisible();
        // 2. login with name and random email
        await loginPage.signup('Mohamed', randomEmail);
        // 3. Verify that 'ENTER ACCOUNT INFORMATION' text is visible
        await expect(page.getByText('ENTER ACCOUNT INFORMATION')).toBeVisible();
        // 4. Fill all account information form
        await sigupPage.fillAccountEnformationData();
        // 5. Verify that 'ACCOUNT CREATED!' text msg is visible
        await expect(accountCreatedPage.accountCreatedTxt).toBeVisible();
        // 6. Click on 'Continue' button
        await accountCreatedPage.getContinuBtn.click();
        // 7. Verify that ' Logged in as Mohamed' in home page
        await expect(await homePage.getElementByText(' Logged in as Mohamed')).toBeVisible();
        // 8. Click on 'Delete Account' button from page header
        await homePage.clickHeaderLink('Delete Account');
        // 9. Verify that 'ACCOUNT DELETED!' text is visible
        await expect(page.getByText('ACCOUNT DELETED!')).toBeVisible();
    });
    
    test("Register user with existing email address @todo", async () => {
        
    });
});
