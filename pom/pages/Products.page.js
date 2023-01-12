import BasePage from './Base.page';

class ProductsPage extends BasePage {
    constructor(page){
        super(page);

        // locators 
        this.reviewProductBtn = page.getByRole('link', {name: 'View Product'})
    }

    async navigate(){
        await super.navigate('/');
    }

    async reviewProduct(index){
        await this.reviewProductBtn.nth(index).click()
    }


}

export default ProductsPage