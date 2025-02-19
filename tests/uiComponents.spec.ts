import {test, expect} from '@playwright/test'

test.beforeEach(async({page})=>{
    await page.goto('http://localhost:4200/');
})

test.describe('Forms Layouts page', ()=>{
    test.beforeEach(async({page})=>{
        await page.getByText('Forms').click();
        await page.getByText('Form Layouts').click();
    })

    test('input fields', async({page})=>{
        const usingTheGridEmailInput = page.locator('nb-card', {hasText: 'Using the Grid'}).getByRole('textbox', {name: 'Email'});
        await usingTheGridEmailInput.fill('test@test.com');

        //generic assertion 
        const inputValue = await usingTheGridEmailInput.inputValue();
        expect(inputValue).toEqual('test@test.com');

        //locator assertion
        await expect(usingTheGridEmailInput).toHaveValue('test@test.com');
    })

    test('radio buttons', async({page})=>{
        const usingTheGridForm = page.locator('nb-card', {hasText: 'Using the Grid'})

        // await usingTheGridForm.getByLabel('Option 1').check({force:true});
        await usingTheGridForm.getByRole('radio', {name: 'Option 1'}).check({force:true});
        const radioStatus = await usingTheGridForm.getByRole('radio', {name: 'Option 1'}).isChecked();
        expect(radioStatus).toBeTruthy();
        // await expect(usingTheGridForm.getByRole('radio', {name: 'Option 1'})).toBeChecked();

        await usingTheGridForm.getByRole('radio', {name: 'Option 2'}).check({force:true});
        expect(await usingTheGridForm.getByRole('radio', {name: 'Option 1'}).isChecked()).toBeFalsy();
        expect(await usingTheGridForm.getByRole('radio', {name: 'Option 2'}).isChecked()).toBeTruthy();
    })
})

test('checkboxes', async({page}) =>{
    await page.getByText('Modal & Overlays').click();
    await page.getByText('Toastr').click();

    await page.getByRole('checkbox', {name: 'Hide on click'}).click({force: true});
    // await page.getByRole('checkbox', {name: 'Hide on click'}).check({force: true});
    // await page.getByRole('checkbox', {name: 'Hide on click'}).uncheck({force: true});

    const allBoxes = await page.getByRole('checkbox');

    for(const box of await allBoxes.all()){
        await box.check({force:true});
        expect(await box.isChecked()).toBeTruthy();
    } 
})

test('list and dropdowns', async({page})=>{
    const dropDownMenu = page.locator('ngx-header nb-select');
    await dropDownMenu.click();

    page.getByRole('list'); // when the list is a UL tag
    page.getByRole('listitem'); // when the list is a LI tag

    // const optionList = page.getByRole('list').locator('nb-option');
    const optionList = page.locator('nb-option-list nb-option'); // alternative with the previous
    await expect(optionList).toHaveText(['Light', 'Dark', 'Cosmic', 'Corporate']);
    await optionList.filter({hasText:'Cosmic'}).click();
    const header = page.locator('nb-layout-header');
    await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)');

    const colors = {
        'Light': 'rgb(255, 255, 255)', 
        'Dark': 'rgb(34, 43, 69)', 
        'Cosmic': 'rgb(50, 50, 89)', 
        'Corporate': 'rgb(255, 255, 255)'
    }

    await dropDownMenu.click();
    for(const color in colors){
        await optionList.filter({hasText: color}).click();
        await expect(header).toHaveCSS('background-color', colors[color]);
        if(color != 'Corporate')
            await dropDownMenu.click(); 
    }
})

test('tooltips', async({page})=>{
    await page.getByText('Modal & Overlays').click();
    await page.getByText('Tooltip').click();

    const toolTipCard = page.locator('nb-card', {hasText: "Tooltip Placements"});
    await toolTipCard.getByRole('button', {name:"Top"}).hover();

    page.getByRole('tooltip'); // alternative only if you have a role tooltip created
    const tooltip = await page.locator('nb-tooltip').textContent();
    expect(tooltip).toEqual('This is a tooltip');
})

test('dialog box', async({page})=>{
    await page.getByText('Tables & Data').click();
    await page.getByText('Smart Table').click();

    // how to manage with browser dialog messages =>
    page.on('dialog', dialog => {
        expect(dialog.message()).toEqual('Are you sure you want to delete?');
        dialog.accept();
    })

    await page.getByRole('table').locator('tr', {hasText: 'mdo@gmail.com'}).locator('.nb-trash').click();
    await expect(page.locator('table tr').first()).not.toHaveText('mdo@gmail.com');
})

test('web tables', async({page})=>{
    await page.getByText('Tables & Data').click();
    await page.getByText('Smart Table').click();

    //1 get the row by any test of this row
    const targetRow = page.getByRole('row', {name: 'twitter@outlook.com'});
    await targetRow.locator('.nb-edit').click();
    await page.locator('input-editor').getByPlaceholder('Age').clear();
    await page.locator('input-editor').getByPlaceholder('Age').fill('35');
    await page.locator('.nb-checkmark').click();

    //2 get the row based on the value of the specific column
    await page.locator('.ng2-smart-pagination').getByText('2').click();
    const targetRowByID = page.getByRole('row', {name: '11'}).filter({has: page.locator('td').nth(1).getByText('11')});
    await targetRowByID.locator('.nb-edit').click();
    await page.locator('input-editor').getByPlaceholder('E-mail').clear();
    await page.locator('input-editor').getByPlaceholder('E-mail').fill('test@test.com');
    await page.locator('.nb-checkmark').click();

    await expect(targetRowByID.locator('td').nth(5)).toHaveText('test@test.com')

    //3 test filter of the table

    const ages = ['20', '30', '40', '200'];
    
    for(let age of ages){
        await page.locator('input-filter').getByPlaceholder('Age').clear();
        await page.locator('input-filter').getByPlaceholder('Age').fill(age);
        await page.waitForTimeout(500);
        const ageRows = page.locator('tbody tr');

        for(let row of await ageRows.all()){
            const cellValue = await row.locator('td').last().textContent();
            
            if(age === '200'){
                expect(await page.getByRole('table').textContent()).toContain('No data found');
            } else {
                expect(cellValue).toEqual(age);
            }
        }
    }

})

test('datepicker', async({page})=>{
    await page.getByText('Forms').click();
    await page.getByText('Datepicker').click();

    const calendarInputField = page.getByPlaceholder('Form Picker');
    await calendarInputField.click();
    await page.locator('[class="day-cell ng-star-inserted"]').getByText('1', {exact: true}).click(); // exact: true is for exact match

    expect(calendarInputField).toHaveValue('Feb 1, 2025');
})