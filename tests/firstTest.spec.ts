import {test, expect} from '@playwright/test'

test.beforeEach(async ({page}) =>{
    await page.goto('http://localhost:4200/');
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
})

test.skip("Locator syntax", async({page}) =>{

    // locator by tag name
    page.locator('input');

    // locator by ID
    page.locator('#inputEmail1');

    // locator by class name
    page.locator('.shape-rectangle');

    //locator by attribute
    page.locator('[placeholder="Email"]');

    //by Class value (full)
    page.locator('class="appearance-filled size-medium shape-rectangle status-basic nb-transition"');

    //combine different selectors
    page.locator('input[placeholder="Email"]');

    //by XPath (NOT RECOMMENDED)
    page.locator('//*[@id="inputEmail1"]');

    //by partial text match
    page.locator(':text("Using)');
    
    //by strict text match
    page.locator(':text-is("Using the Grid")');

})

test("user facing locators", async({page})=>{
    await page.getByRole("textbox",{name: "Email"}).first().click();

    await page.getByLabel('Email').first().click();

    await page.getByPlaceholder('Jane Doe').first().click();

})

test("locating child elems", async({page}) => {
    await page.locator('nb-card nb-radio :text-is("Option 1")').click();

    await page.locator('nb-card').getByRole('button',{name: "Sign in"}).first().click();

    await page.locator('nb-card').nth(3).getByRole("button").click();
})

test("locating parent elems", async({page}) => {
    await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole("textbox",{name: "Email"}).first().click();
    await page.locator('nb-card', {has: page.locator("#inputEmail1")}).getByRole("textbox",{name: "Email"}).first().click();

    await page.locator('nb-card').filter({hasText: 'Basic form'}).getByRole("textbox",{name: "Email"}).first().click();

    await page.locator('nb-card').filter({has:page.locator('nb-checkbox')}).filter({hasText: 'Sign in'})
        .getByRole("textbox",{name: "Email"}).first().click();

    await page.locator(':text-is("Using the Grid")').locator('..').getByRole("textbox",{name: "Email"}).first().click();
})

test("reusing locators", async ({page})=>{

    const basicForm = page.locator('nb-card').filter({hasText: 'Basic form'}); 
    const emailField = basicForm.getByRole("textbox",{name: "Email"});

    await emailField.first().fill('test@test.com');
    await basicForm.getByRole("textbox",{name: "Password"}).first().fill('123123');
    await basicForm.locator('nb-checkbox').click();
    await basicForm.getByRole('button').click();

    await expect(emailField).toHaveValue('test@test.com');
})  

test('extracting values', async({page})=>{
    const basicForm = page.locator('nb-card').filter({hasText: 'Basic form'}); 
    const buttonText = await basicForm.locator('button').textContent();
    expect(buttonText).toEqual('Submit');

    // all text values
    const allRadioButtonsLabels = await page.locator('nb-radio').allTextContents();
    expect(allRadioButtonsLabels).toContain('Option 1');

    //inputValue
    const emailField = basicForm.getByRole("textbox",{name: "Email"});
    await emailField.fill('test2@test.com');
    const emailValue = await emailField.inputValue();
    expect(emailValue).toEqual('test2@test.com');

    const placeholderValue = await emailField.getAttribute('placeholder');
    expect(placeholderValue).toEqual('Email');
})

test('assertions', async({page})=>{
    const basicFormButton = page.locator('nb-card').filter({hasText: 'Basic form'}).locator('button'); 
    //General asserionts
    const text = await basicFormButton.textContent();
    expect(text).toEqual('Submit');

    //Locator assertion
    await expect(basicFormButton).toHaveText("Submit");

    //Soft assertion
    await expect.soft(basicFormButton).toHaveText("Submit5");
    await basicFormButton.click();
})