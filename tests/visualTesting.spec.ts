import {expect, test} from '@playwright/test';

test('first test', async ({page}) => {
    await page.goto('https://playwright-practice-app.onrender.com')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
    const usingTheGridForm = await page.locator('nb-card', {hasText: "Using the Grid"})
    await expect(usingTheGridForm).toHaveScreenshot()
    // to ignore minor differences in screenshot
    // await expect(usingTheGridForm).toHaveScreenshot({maxDiffPixels: 150})
})
