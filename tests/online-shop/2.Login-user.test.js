import { chromium, test, expect } from "@playwright/test"

test("Login user with correct email and password", async () => {
    // 1. Launch browser
    const browser = await chromium.launch();
    const page = await browser.newPage();
    // 2. Navigate to url 'http://automationexercise.com'
    await page.goto("https://automationexercise.com");
    // 3. Verify that user located in home page successfully
    await expect(page).toHaveURL("https://automationexercise.com");
    // 4. Click on 'Signup / Login' button
    await page.locator("//a[@href='/login']").click();
    // 5. Verify 'Login to your account' is visible
    await expect(page.getByText('Login to your account')).toBeVisible();
    // 6. Enter correct email address and password
    await page.locator("[data-qa='login-email']").type('mohamed222@gmail.com');
    await page.locator("[data-qa='login-password']").type('Password123');
    // 7. Click 'login' button
    await page.locator("[data-qa='login-button']").click();
    // 8. Verify that 'Logged in as username' is visible
    await expect(page.getByText(' Logged in as Mohamed')).toBeVisible();
});
