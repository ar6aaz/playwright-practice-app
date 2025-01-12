import {test} from '@playwright/test';

test('first test', async ({page}, testInfo) => {
    await page.goto('/')
    await page.locator('.sidebar-toggle').click()
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
    // If you dont want to write a separate test for mobile 
    // and add conditional steps for mobile devices in the 
    // same test
    if(testInfo.project.name === 'mobile'){
        //  do something
    }
})
