import BasePage from './Base.page';

class ViewCartPage extends BasePage {
    constructor(page){
        super(page);
        // locators 
        this.proceedToCheckoutBtn = page.getByText('Proceed To Checkout')
    }

    async navigate(){
        await super.navigate('/view_cart');
    }

    async proceedToCheckout(){
        await this.proceedToCheckoutBtn.click();
    }
}

export default ViewCartPage