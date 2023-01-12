import BasePage from './Base.page';

class ProductDetailsPage extends BasePage {
    constructor(page){
        super(page);

        // locators 
        this.reviewName = page.locator('#name')
        this.reviewEmail = page.locator('#email')
        this.reviewAddress = page.locator('#review')
        this.submitReviewBtn = page.locator('#button-review')
    }

    async navigate(id){
        await super.navigate('/product_details/'+`${id}`);
    }

    async writeReview(name, email, address){
        await this.reviewName.fill(name);
        await this.reviewEmail.fill(email);
        await this.reviewAddress.fill(address);
        await this.submitReviewBtn.click();
    }
}

export default ProductDetailsPage