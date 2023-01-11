class BasePage{
    constructor(page){
        this.page = page;
    }

    async navigate(path){
        await this.page.goto(`https://automationexercise.com/${path}`);
    }
}

export default BasePage