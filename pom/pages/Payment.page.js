import BasePage from './Base.page';

class CheckoutPage extends BasePage {
    constructor(page){
        super(page);

        // locators 
        this.nameOnCard =  page.locator('[data-qa="name-on-card"]')
        this.cardNumber =  page.locator('[data-qa="card-number"]')
        this.cvv =  page.locator('[data-qa="cvc"]')
        this.expiryMonth =  page.locator('[data-qa="expiry-month"]')
        this.expiryYear = page.locator('[data-qa="expiry-year"]')
        this.payAndConfirmOrderBtn = page.locator('#submit')
        this.congratulationsMsg = page.getByText('Congratulations! Your order has been confirmed!')
    }

    async navigate(){
        await super.navigate('/payment');
    }

    async enterPaymentDetails(NameOnCard, CardNumber, Cvv, ExpMonth, ExpYear){
        await this.nameOnCard.fill(NameOnCard);
        await this.cardNumber.fill(CardNumber);
        await this.cvv.fill(Cvv);
        await this.expiryMonth.fill(ExpMonth);
        await this.expiryYear.fill(ExpYear);
    }

    async payAndConfirmOrder(){
        await this.payAndConfirmOrderBtn.click();
    }

}

export default CheckoutPage