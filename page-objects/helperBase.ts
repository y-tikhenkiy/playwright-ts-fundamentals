import {Page} from '@playwright/test';

export class HelperBase{
    readonly page: Page;

    constructor(page: Page){
        this.page = page;
    }

    waitForNumberOfSeconds(timeInSeconds: number){
        return this.page.waitForTimeout(timeInSeconds * 1000);
    }
}