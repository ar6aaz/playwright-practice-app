import {expect, test} from '@playwright/test';
import tags from './test-data/tags.json';

test.beforeEach(async({page}) => {
    await page.route('*/**/api/tags', async route => {
        await route.fulfill({
            body: JSON.stringify(tags)
        })
    })

    page.goto('https://conduit.bondaracademy.com/')
})

test('verify mocked repsonse', async({page})=> {
    await expect(page.locator('[class=navbar-brand]')).toHaveText('conduit')
    const mockedTags = await page.locator('.tag-pill').allTextContents()
    console.log(mockedTags)
    expect(mockedTags).toEqual([ ' Selenium ', ' Playwright ', ' Coding ', ' Git ' ])
})