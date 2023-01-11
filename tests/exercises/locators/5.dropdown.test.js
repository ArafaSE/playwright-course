import { chromium, test, expect } from "@playwright/test"

test("Dropdown", async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto("https://the-internet.herokuapp.com/dropdown");

    // get Dropdown by id then make sure it contains 3 options 
    const dropdown = await page.$('#dropdown'); // .$ working similar to 'locatos' but without autowait 
    const allOptions = await dropdown.$$('option'); // .$$ get more than one result
    expect(allOptions.length).toBe(3);
     
    // select by value '2' and verify your selction 
    await dropdown.selectOption({value: '2'});
    expect(await page.locator('//option[@selected]').innerText()).toBe('Option 2');

    // select by lable 'Option 1' and verify your selction 
    await dropdown.selectOption({label: 'Option 1'});
    expect(await page.locator('//option[@selected]').innerText()).toBe('Option 1');

    // select by index 2 and verify your selction 
    await dropdown.selectOption({index: 2});
    expect(await page.locator('//option[@selected]').innerText()).toBe('Option 2');

    await browser.close();
});