import BasePage from './Base.page';

class CheckoutPage extends BasePage {
    constructor(page){
        super(page);

        // locators 
        this.deliveryAddressHeaderTxt = page.getByText('Your delivery address')
        this.billingAddressHeaderTxt = page.getByText('Your billing address')
        this.reviewYourOrderHeaderTxt = page.getByText('Review Your Order')
        this.commentTextAreaInput = page.locator("[name='message']")
        this.placeOrderBtn = page.getByRole('link', {name: 'Place Order'})
    }

    async navigate(){
        await super.navigate('/checkout');
    }

    async addComment(text){
        await this.commentTextAreaInput.fill(text);
    }

    async placeOrder(){
        await this.placeOrderBtn.click();
    }
}

export default CheckoutPage