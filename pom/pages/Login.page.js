import BasePage from './Base.page';

class LoginPage extends BasePage {
    constructor(page){
        super(page);

        // locators 
        this.getLoginEmailInput = page.locator("[data-qa='login-email']");
        this.getLoginPasswordInput = page.locator("[data-qa='login-password']");
        this.getLoginBtn = page.locator("[data-qa='login-button']");
        this.getSignupNameInput = page.locator("[data-qa='signup-name']");
        this.getSignupEmailInput = page.locator("[data-qa='signup-email']");
        this.getSignupBtn = page.locator("[data-qa='signup-button']");
    }

    async navigate(){
        await super.navigate('/login');
    }

    async login(username, password){
        await this.getLoginEmailInput.fill(username);
        await this.getLoginPasswordInput.fill(password);
        await this.getLoginBtn.click(); 
    }

    async signup(name, email){
        await this.getSignupNameInput.fill(name);
        await this.getSignupEmailInput.fill(email);
        await this.getSignupBtn.click();
    }
}

export default LoginPage