import { Page } from "@playwright/test";

export class NavigatoinPage{

    readonly page:Page

    constructor(page: Page){
        this.page = page;
    }

    async formLayoutsPage(){
        await this.page.getByText('Forms').click();
        await this.page.getByText('Form Layouts').click();
    }
}