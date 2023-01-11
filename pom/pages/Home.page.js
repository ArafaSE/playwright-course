import BasePage from './Base.page';

class HomePage extends BasePage {
    constructor(page){
        super(page);

        // selectors 
        this.loginLink = "//a[@href='/login']";
        this.productsLink = "//a[@href='/products']";
        this.deleteAccountBtn = page.locator("//a[@href='/delete_account']")
    }

    async navigate(){
        await super.navigate('/');
    }

    async clickHeaderLink(name){
        await this.page.getByRole('link', {name: `${name}`}).click();
    }

    async getElementByText(text){
        return await this.page.getByText(text)
    }

}

export default HomePage