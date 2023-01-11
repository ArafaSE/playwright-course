import { chromium, test, expect } from "@playwright/test"

test("Register user", async () => {
    // generate rando email address
    const emailAddress = (Math.random() + 1).toString(36).substring(2) + "@gmail.com";
    // 1. Launch browser
    const browser = await chromium.launch();
    const page = await browser.newPage();
    // 2. Navigate to url 'http://automationexercise.com'
    await page.goto("https://automationexercise.com");
    // 3. Click on 'Products' button
    await page.getByRole('link', {name: ' Products'}).click();
    // 4. Verify user is navigated to ALL PRODUCTS page successfully
    await expect(page).toHaveURL('https://automationexercise.com/products');
    // 5. Click on 'View Product' button
    await page.getByRole('link', {name: 'View Product'}).nth(0).click();
    // 6. Verify 'Write Your Review' is visible
    await expect(page.getByText('Write Your Review')).toBeVisible();
    // 7. Enter name, email and review
    await page.locator('#name').type('Mohamed');
    await page.locator('#email').type('mohamed222@gmail.com');
    await page.locator('#review').type('Perfect material with good price, Thanks!');
    // 8. Click 'Submit' button
    await page.locator('#button-review').click();
    // 9. Verify success message 'Thank you for your review.'
    await expect(page.getByText("Thank you for your review.")).toBeVisible();

    await page.close();
});