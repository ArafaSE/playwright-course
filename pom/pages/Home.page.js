import BasePage from './Base.page';

class HomePage extends BasePage {
    constructor(page){
        super(page);
        // Locators 
        this.continueShopingBtn = page.getByRole("button", {name: 'Continue Shopping'})
    }

    async navigate(){
        await super.navigate('/');
    }

    async clickHeaderLink(name){
        await this.page.getByRole('link', {name: `${name}`}).nth(0).click();
    }

    async getElementByText(text){
        return await this.page.getByText(text)
    }

    async addProductToCart(productId){
        await this.page.locator(`[data-product-id='${productId}']`).nth(0).click();
    }

    async submitContinueBtn(){
        await this.continueShopingBtn.click();
    }

}

export default HomePage