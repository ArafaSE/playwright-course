class BasePage{
    constructor(page){
        this.page = page;
        this.baseUrl = 'https://automationexercise.com';
    }

    async navigate(path){
        await this.page.goto(`${this.baseUrl}/${path}`);
    }
}

export default BasePage