import BasePage from './Base.page';

class LoginPage extends BasePage {
    constructor(page){
        super(page);

        // locators 
        this.accountCreatedTxt = page.getByText('ACCOUNT CREATED!');
        this.getContinuBtn = page.locator("[data-qa='continue-button']")
    }
}

export default LoginPage