import { test, expect } from "@playwright/test"

import HomePage from "../pages/Home.page";
import LoginPage from "../pages/Login.page";

let homePage, loginPage;

test.beforeEach(async ({page}) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    await homePage.navigate();
});

test.describe('Login user', async () => {
    test("Login user with correct email and password", async ({page}) => {
        // 1. From Home page Click on 'Login' header button to open the page
        await homePage.clickHeaderLink(' Signup / Login');
        // 2. Write your login email and passowrd then submit
        await loginPage.login('mohamed222@gmail.com', 'Password123')
        // 3. Verify that 'Logged in as username' is visible
        await expect(page.getByText(' Logged in as Mohamed')).toBeVisible();
    });
    
    test("Login user with incorrect email and password", async ({page}) => {
        // 1. navigate to login page
        await loginPage.navigate();
        // 2. Write incorrect login email and password then submit
        await loginPage.login('hamada@gmail.com', 'Password123');
        // 3. Verify that 'Your email or password is incorrect!' is visible
        await expect(page.getByText('Your email or password is incorrect!')).toBeVisible();
    });
});
