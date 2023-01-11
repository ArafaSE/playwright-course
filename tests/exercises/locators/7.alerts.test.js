import { chromium, test, expect } from "@playwright/test"

test("7- Alerts", async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto("https://the-internet.herokuapp.com/javascript_alerts");

    // handle alert dialog 
    page.on('dialog', async dialog => {
        console.log(dialog.message());
        await dialog.accept('Hi, I am trying to learn PW!');
    });

    // click on Js alert, Js confirm, and JS prompt after getting them by text, then verify the results text
    await page.getByText('Click for JS Alert').click();
    expect(await page.locator('#result').innerText()).toContain('You successfully clicked an alert');

    await page.getByText('Click for JS Confirm').click();
    expect(await page.locator('#result').innerText()).toContain('You clicked: Ok');

    await page.getByText('Click for JS Prompt').click();
    expect(await page.locator('#result').innerText()).toContain('You entered: Hi, I am trying to learn PW!');

    await browser.close();
});