import { chromium, test, expect } from "@playwright/test"

test("6- checkboxes and Radio buttons", async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto("https://itera-qa.azurewebsites.net/home/automation");

    // select 'Monday' and 'Friday' by Lable and check them
    await page.getByLabel('Monday').check();
    await page.getByLabel('Friday').check();

    // verify the that 'Monday' and 'Friday' is checked 
    await expect(page.getByLabel('Monday')).toBeChecked();
    await expect(page.getByLabel('Friday')).toBeChecked();

    // unselect 'Friday' and verify it is unchecked
    await page.getByLabel('Friday').uncheck();
    await expect(page.getByLabel('Friday')).not.toBeChecked()

    // Select Gender 'Male' Radio button and verify it is checked 
    await page.locator('#male').check();
    await expect(page.locator('#male')).toBeChecked();

    // select Gender 'Female' and verify it is checked and 'Male' is unchecked
    await page.getByLabel('Female').check();
    await expect(page.getByLabel('Female')).toBeChecked();
    await expect(page.locator('#male')).not.toBeChecked();

    await browser.close();
});