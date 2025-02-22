import {test, expect} from '@playwright/test'
import{NavigatoinPage} from '../page-objects/navigationPage'
import { FormLayoutsPage } from '../page-objects/formLayoutsPaga';

test.beforeEach(async({page})=>{
    await page.goto('http://localhost:4200/');
})

test('navigate to forms page', async({page})=>{
    const navigateTo = new NavigatoinPage(page);
    await navigateTo.formLayoutsPage();
    await navigateTo.datePickerPage();
    await navigateTo.smartTablePage();
    await navigateTo.toastrPage();
    await navigateTo.tooltipPage();
})

test('paramethrized methods', async({page})=>{
    const navigateTo = new NavigatoinPage(page);
    const onFormLayoutsPage = new FormLayoutsPage(page);

    await navigateTo.formLayoutsPage();
    await onFormLayoutsPage.submitUsingTheGridFormWithCredentialsAndSelectingOption('test@test.com','123123','Option 1');
    await onFormLayoutsPage.submitInlineFormWithNameEmailAndCheckbox('John Smith', 'jhon95@test.com', true);
})