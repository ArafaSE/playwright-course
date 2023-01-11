import { chromium, test, expect } from "@playwright/test"

test("Login using Xpath", async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

    // find username input by its name then type 'Admin'
    await page.locator("//input[@name='username']").type('Admin');

    // fint password input by placeholder then type 'admin123'
    await page.locator("//input[@placeholder='Password']").type("admin123");
    
    // find forget password link with div class name then get p child
    const forgetPasswordLink = page.locator("//div[@class='orangehrm-login-forgot']//p");

    // verify that forget password link added
    await expect(forgetPasswordLink).toBeVisible();

    // find submit button by its type then click it
    const submitBtn = page.locator("//button[@type='submit']");
    await submitBtn.click();
    // verify user redirected to dashbaord page
    await expect(page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index")

    await browser.close();
});