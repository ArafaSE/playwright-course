import { chromium, test, expect } from "@playwright/test"

test("Login Using CSS Selectors", async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

    // find username input by its name then type 'Admin'
    await page.locator("[name='username']").type('Admin');

    // find password input by its placeholder then type 'admin123'
    await page.locator("[placeholder='Password']").type('admin123');

    // find forget pssword link with div class name then get p child 
    const forgetPasswordLink = page.locator("[class='orangehrm-login-forgot'] > p")

    // verify that forget password link added
    await expect(forgetPasswordLink).toBeVisible();

    // find submit button by its type and click it
    const submitBtn = page.locator("[type='submit']");
    await submitBtn.click();
    
    // verify user redirected to dashbaord page
    expect(page.url()).toBe("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index");

    await browser.close();
});