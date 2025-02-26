import {test, expect} from '@playwright/test'
import { PageManager } from '../page-objects/pageManager';
import {NavigatoinPage} from '../page-objects/navigationPage'
import { FormLayoutsPage } from '../page-objects/formLayoutsPage';
import { DatepickerPage } from '../page-objects/datepickerPage';

test.beforeEach(async({page})=>{
    await page.goto('http://localhost:4200/');
})

test('navigate to forms page', async({page})=>{
    const pm = new PageManager(page)

    await pm.navigateTo().formLayoutsPage();
    await pm.navigateTo().datePickerPage();
    await pm.navigateTo().smartTablePage();
    await pm.navigateTo().toastrPage();
    await pm.navigateTo().tooltipPage();

})

test('paramethrized methods', async({page})=>{
    const pm = new PageManager(page)

    await pm.navigateTo().formLayoutsPage();
    await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectingOption('test@test.com','123123','Option 1');
    await pm.onFormLayoutsPage().submitInlineFormWithNameEmailAndCheckbox('John Smith', 'jhon95@test.com', true);
    await pm.navigateTo().datePickerPage();
    await pm.onDatePickerPage().selectCommonDatePickerDateFromToday(7);
    await pm.onDatePickerPage().selectDatePickerWithRangeFromToday(7, 18);
})