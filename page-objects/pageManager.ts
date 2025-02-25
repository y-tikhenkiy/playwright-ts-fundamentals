import {Page} from '@playwright/test';
import{NavigatoinPage} from '../page-objects/navigationPage';
import { FormLayoutsPage } from '../page-objects/formLayoutsPaga';
import { DatepickerPage } from '../page-objects/datepickerPage';

export class PageManager{
    private readonly page: Page;
    private readonly navigationPage: NavigatoinPage
    private readonly formLayoutsPage: FormLayoutsPage
    private readonly datepickerPage: DatepickerPage

    constructor(page: Page){
        this.page = page;
        this.navigationPage = new NavigatoinPage(this.page);
        this.formLayoutsPage = new FormLayoutsPage(this.page);
        this.datepickerPage = new DatepickerPage(this.page);
    }

    navigateTo(){
        return this.navigationPage;
    }

    onFormLayoutsPage(){
        return this.formLayoutsPage;
    }

    onDatePickerPage(){
        return this.datepickerPage;
    }
}