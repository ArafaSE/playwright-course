import { test, expect } from "@playwright/test"

import HomePage from "../pages/Home.page";
import LoginPage from "../pages/Login.page";
import ViewCartPage from "../pages/View_cart.page";
import CheckoutPage from "../pages/Checkout.page";
import PaymentPage from "../pages/Payment.page";

let homePage, loginPage, viewCartPage, checkoutPage, paymentPage;

test.beforeEach(async ({page}) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    viewCartPage = new ViewCartPage(page);
    checkoutPage = new CheckoutPage(page);
    paymentPage = new PaymentPage(page);
});

test.describe('Place order', async () => {
    test("login before checkout @hp", async ({page}) => {
        // 1. Navigate to login page and login
        await loginPage.navigate();
        await loginPage.login(process.env.LOGIN_EMAIL, process.env.LOGIN_PASSWORD);
        await expect(page.getByText(' Logged in as')).toBeVisible();

        // 2. Add second product to cart and verify it's added 
        await homePage.addProductToCart('2');
        await expect(page.getByText('Your product has been added to cart.')).toBeVisible();

        // 3. Continue shoping button then Click on 'Cart' button
        await homePage.submitContinueBtn();
        await homePage.clickHeaderLink('Cart');

        // 4. Verify that cart page is displayed then Click Proceed To Checkout
        await expect(page.getByText('Shopping Cart')).toBeVisible();
        await viewCartPage.proceedToCheckout();

        // 5. Verify 'Your delivery address', 'Your billing address', and 'Review Your Order' headers are visible
        await expect(await checkoutPage.deliveryAddressHeaderTxt).toBeVisible();
        await expect(await checkoutPage.billingAddressHeaderTxt).toBeVisible();
        await expect(await checkoutPage.reviewYourOrderHeaderTxt).toBeVisible();

        // 6. Enter description in comment text area and click 'Place Order'
        await checkoutPage.addComment('Please deliver it between 9am-5pm');
        await checkoutPage.placeOrder();
        // 7. Enter payment details: Name on Card, Card Number, CVC, Expiration date
        await paymentPage.enterPaymentDetails('Mohamed Arafa', '1234 3456 4567 3467', '235', '05', '2025');
        // 8. Click 'Pay and Confirm Order' button
        await paymentPage.payAndConfirmOrder();
        // 9. Verify success message 'Congratulations! Your order has been confirmed!'
        await expect(await paymentPage.congratulationsMsg).toBeVisible();
    });
});
