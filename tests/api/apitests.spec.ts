import {expect, test} from '@playwright/test';
import tags from './test-data/tags.json';

test.beforeEach(async({page}) => {
    await page.route('*/**/api/tags', async route => {
        await route.fulfill({
            body: JSON.stringify(tags)
        })
    })

    await page.route('*/**/api/articles*', async route => {
        const response = await route.fetch()
        const responseBody = await response.json()
        responseBody.articles[0].title = "Modified title"
        responseBody.articles[0].description = "Modified description"
        await route.fulfill({
            body: JSON.stringify(responseBody)
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

test('intercept and modify repsonse', async({page})=> {
    await expect(page.getByRole('heading', {name: 'Modified title'})).toBeVisible()
    await expect(page.locator('.preview-link p').first()).toHaveText('Modified description')
})