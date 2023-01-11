import { chromium, test, expect } from "@playwright/test"

test("Register user", async () => {
    // generate random email address
    const emailAddress = (Math.random() + 1).toString(36).substring(2) + "@gmail.com";
    // 1. Launch browser
    const browser = await chromium.launch();
    const page = await browser.newPage();
    // 2. Navigate to url 'http://automationexercise.com'
    await page.goto("https://automationexercise.com");
    // 3. Verify that user located in home page successfully
    await expect(page).toHaveURL("https://automationexercise.com");
    // 4. Click on 'Signup / Login' button
    await page.locator("//a[@href='/login']").click();
    // 5. Verify 'New User Signup!' is visible
    await expect(page.getByText('New User Signup!')).toBeVisible();
    // 6. Enter valid name and email address
    await page.locator("[data-qa='signup-name']").type('Mohamed');
    await page.locator("[data-qa='signup-email']").type(emailAddress);
    // 7. Click 'Signup' button
    await page.locator("[data-qa='signup-button']").click();
    // 8. Verify that 'ENTER ACCOUNT INFORMATION' is visible
    await expect(page.getByText('ENTER ACCOUNT INFORMATION')).toBeVisible();
    // 9. Fill details: Title, Password, Date of birth
    await page.locator("#id_gender1").check();
    await page.locator("[data-qa='password']").type("Password123");
    const days = page.locator("#days");
    const months = page.locator("#months");
    const years = page.locator("#years");
    await days.selectOption({value: '30'})
    await months.selectOption({value: '1'})
    await years.selectOption({value: '1994'})
    // 10. Select checkbox 'Sign up for our newsletter!'
    await page.locator("#newsletter").check();
    // 11. Select checkbox 'Receive special offers from our partners!'
    await page.locator("#optin").check();
    // 12. Fill details: First name, Last name, Company, Address, Country, State, City, Zipcode, Mobile Number
    await page.locator("[data-qa='first_name']").type("Mohamed");
    await page.locator("[data-qa='last_name']").type("Ahmed");
    await page.locator("[data-qa='company']").type("Vodafone");
    await page.locator("[data-qa='address']").type("22 Thawra St");
    const countries = page.locator("#country");
    await countries.selectOption({value: 'United States'})
    await page.locator("[data-qa='state']").type("California");
    await page.locator("[data-qa='city']").type("Los Angeles");
    await page.locator("[data-qa='zipcode']").type("90002");
    await page.locator("[data-qa='mobile_number']").type("323 123456789");
    // 13. Click 'Create Account button'
    await page.locator("[data-qa='create-account']").click();
    // 14. Verify that 'ACCOUNT CREATED!' is visible
    await expect(page.getByText('ACCOUNT CREATED!')).toBeVisible();
    // 15. Click 'Continue' button
    await page.locator("[data-qa='continue-button']").click();
    // 16. Verify that 'Logged in as username' is visible
    await expect(page.getByText(' Logged in as Mohamed')).toBeVisible();
    // 17. Click 'Delete Account' button
    await page.locator("//a[@href='/delete_account']").click();
    // 18. Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
    await expect(page.getByText('ACCOUNT DELETED!')).toBeVisible();

    await browser.close();
});

test("Register user with existing email address", async () => {
    // 1. Launch browser
    const browser = await chromium.launch();
    const page = await browser.newPage();
    // 2. Navigate to url 'http://automationexercise.com'
    await page.goto("https://automationexercise.com");
    // 3. Verify that user located in home page successfully
    await expect(page).toHaveURL("https://automationexercise.com");
    // 4. Click on 'Signup / Login' button
    await page.locator("//a[@href='/login']").click();
    // 5. Verify 'New User Signup!' is visible
    await expect(page.getByText('New User Signup!')).toBeVisible();
    // 6. Enter name and already registered email address
    await page.locator("[data-qa='signup-name']").type('Mohamed');
    await page.locator("[data-qa='signup-email']").type('mohamed222@gmail.com');
    // 7. Click 'Signup' button
    await page.locator("[data-qa='signup-button']").click();
    // 8. Verify error 'Email Address already exist!' is visible
    await expect(page.getByText('Email Address already exist!')).toBeVisible();

    await browser.close();
});