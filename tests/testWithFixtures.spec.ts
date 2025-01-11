import {test} from '../test-options';

test('first test', async ({page, formLayoutsPage}) => {
    await page.locator('#inputEmail1').fill('test@test.com')
    await page.locator('#inputPassword2').fill('test@test.com')
    await page.getByRole('radio', {name: 'Option 1'}).click({force: true})
    await page.getByRole('button', {name: 'Sign in'}).first().click()
})
