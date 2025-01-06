import {expect, test} from '@playwright/test';
import tags from './test-data/tags.json';

test.describe('mocking & intercepting', () => {

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
})

test.describe('authenticated tests', () => {

    test.beforeEach('login', async ({page}) => {
        await page.goto('https://conduit.bondaracademy.com/')
    })

    test('adding and deleting a new post', async({page, request}) => {
        const response = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {data: {"user":{"email":"conduit123@test.com","password":"conduit123"}}})
        const responseJSON = await response.json()
        const authToken = responseJSON.user.token

        const postCreationReponse = await request.post(
            'https://conduit-api.bondaracademy.com/api/articles/', {
            data:{"article":{"title":"title","description":"desc","body":"content","tagList":[]}}
        })
        expect(postCreationReponse.status()).toEqual(201)

        const postDeletionResponse = await request.delete(
            'https://conduit-api.bondaracademy.com/api/articles/title-16660'
        )
        expect(postDeletionResponse.status()).toEqual(204)

    })

    test('deleting a new post', async({page, request}) => {

        await page.getByText('New Article').first().click()
        await page.getByPlaceholder('Article Title').fill('Test article')
        await page.locator('[formcontrolname=description]').fill('Test description')
        await page.locator('[formcontrolname=body]').fill('Test body')
        await page.getByPlaceholder('Enter tags').fill('Tag1')
        await page.getByRole('button', {name: ' Publish Article '}).click()
        
        const publishArticleResponse = await page.waitForResponse('https://conduit-api.bondaracademy.com/api/articles/')
        const publishArticleResponseJSON = await publishArticleResponse.json()
        const slugId = publishArticleResponseJSON.article.slug

        const postDeletionResponse = await request.delete(
            `https://conduit-api.bondaracademy.com/api/articles/${slugId}`
        )
        expect(postDeletionResponse.status()).toEqual(204)

    })
})
