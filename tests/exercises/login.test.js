import { chromium, test, expect } from "@playwright/test"
import { delay } from "../../utlis";

test("User can login to his account", async () => {

    const browser = await chromium.launch();
    const page = await browser.newPage();

    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    await page.getByPlaceholder("Username").type("Admin");
    await page.getByPlaceholder("Password").type("admin123");
    const submitBtn =  page.getByRole('button', {type: 'submit'})
    await submitBtn.click();

    expect(page.url()).toBe("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index");

    /* extra wait if we need to see the main page because it runs so fast */
    //await delay(3000)

    await browser.close();
})