import { chromium, test, expect } from "@playwright/test"

test("Place order - login before checkout", async () => {
    // 1. Launch browser
    const browser = await chromium.launch();
    const page = await browser.newPage();
    // 2. Navigate to url 'http://automationexercise.com'
    await page.goto("https://automationexercise.com");
    // 3. Verify that user located in home page successfully
    await expect(page).toHaveURL("https://automationexercise.com");
    // 4. Click on 'Signup / Login' button
    await page.locator("//a[@href='/login']").click();
    // 5. Fill email, password and click 'Login' button
    await page.locator("[data-qa='login-email']").type('mohamed222@gmail.com');
    await page.locator("[data-qa='login-password']").type('Password123');
    await page.locator("[data-qa='login-button']").click();
    // 6. Verify 'Logged in as username' at top
    await expect(page.getByText(' Logged in as Mohamed')).toBeVisible();
    // 7. Add products to cart and verify 'Your product has been added to cart.' is visible 
    await page.locator('[data-product-id="2"]').nth(0).click();
    await expect(page.getByText('Your product has been added to cart.')).toBeVisible();
    // 8. Continue shoping button then Click on 'Cart' button
    await page.getByRole("button", {name: 'Continue Shopping'}).click();
    await page.getByRole("link", {name: 'Cart'}).click();
    // 9. Verify that cart page is displayed
    await expect(page.getByText('Shopping Cart')).toBeVisible();
    // 10. Click Proceed To Checkout
    await page.getByText('Proceed To Checkout').click();
    // 11. Verify 'Your delivery address', 'Your billing address', and 'Review Your Order' sections are visible
    await expect(page.getByText('Your delivery address')).toBeVisible();
    await expect(page.getByText('Your billing address')).toBeVisible();
    await expect(page.getByText('Review Your Order')).toBeVisible();
    // 12. Enter description in comment text area and click 'Place Order'
    await page.locator('[name="message"]').fill('Please deliver it between 9am-5pm');
    await page.getByRole('link', {name: 'Place Order'}).click();
    // 13. Enter payment details: Name on Card, Card Number, CVC, Expiration date
    await page.locator('[data-qa="name-on-card"]').fill('Mohamed Arafa');
    await page.locator('[data-qa="card-number"]').fill('3456 2345 4555 3456');
    await page.locator('[data-qa="cvc"]').fill('345');
    await page.locator('[data-qa="expiry-month"]').fill('05');
    await page.locator('[data-qa="expiry-year"]').fill('2025');
    // 14. Click 'Pay and Confirm Order' button
    await page.locator('#submit').click();
    // 15. Verify success message 'Congratulations! Your order has been confirmed!'
    await expect(page.getByText('Congratulations! Your order has been confirmed!')).toBeVisible();

    await page.close();
});