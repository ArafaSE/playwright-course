import { chromium, test, expect } from "@playwright/test"

test("List and Filters", async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

   // Login then make sure the user located in the main dashbaord
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill('admin123');
    await page.getByRole('button', {type: 'submit'}).click();
    expect(page.url()).toBe("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index");

    // make sure all main menu elements is '11' 
    await expect(page.locator('.oxd-main-menu-item-wrapper')).toHaveCount(11);  

    // filter all items to get item with 'My Info' text, then click on it 
    await page
        .locator('.oxd-main-menu-item-wrapper')
        .filter({has: page.getByText('My Info')})
        .click()
    
    // find all headers on the page and make sure 'Personal Details' is added
    expect(page
        .getByRole('heading')
        .filter({has: page.getByText('Personal Details')})
    ).toBeVisible;

    // get Emplpyee Id input by filtering all inputs in the group 
    const empIdInput = page
        .locator('.oxd-input-group')
        .filter({has: page.getByText('Employee Id')})
        .locator('.oxd-input');
   // fill it with "2345" them make sure it's value updated
    await empIdInput.fill("2345")
    expect(await empIdInput.inputValue()).toBe("2345")

    await browser.close();
});