import {test} from '@playwright/test';

test('first test', async ({page}) => {
    await page.goto('https://playwright-practice-app.onrender.com/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})
