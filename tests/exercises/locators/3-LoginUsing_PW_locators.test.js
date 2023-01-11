import { chromium, test, expect } from "@playwright/test"

test("Login Using PW internal locators", async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

    // get company logo by it's alt text then make sure it's visible 
    const logo = page.getByAltText('company-branding');
    await expect(logo).toBeVisible();

    // find form header by it's role and name, ana make sure it's visible 
    const formHeaderTxt = page.getByRole('heading', { name: 'Login' });
    await expect(formHeaderTxt).toBeVisible();

    // find username input by pw placeholder, then type 'Admin' 
    await page.getByPlaceholder('Username').type('Admin');

    // find password by pw placeholder, then type 'admin213'
    await page.getByPlaceholder('Password').type('admin123');

    // find foret password link byt text, and make sure It's visible
    const foretPassLink = page.getByText('Forgot your password?');
    await expect(foretPassLink).toBeVisible();

    // find login button by pw Role and type, make sure the btn state is enabled then click on it
    const submitBtn =  page.getByRole('button', {type: 'submit'});
    expect(await submitBtn.isEnabled());
    await submitBtn.click();

    // verify user redirected to dashbaord page
    expect(page.url()).toBe("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index");

    await browser.close();
});