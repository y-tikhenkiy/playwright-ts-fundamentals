import {test, expect} from '@playwright/test'
import{NavigatoinPage} from '../page-objects/navigationPage'

test.beforeEach(async({page})=>{
    await page.goto('http://localhost:4200/');
})

test('navigate to forms page', async({page})=>{
    const navigateTo = new NavigatoinPage(page);
    await navigateTo.formLayoutsPage();
})