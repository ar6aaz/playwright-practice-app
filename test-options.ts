import {test as base} from '@playwright/test'

export type TestOptions = {
    globalSQAUrl : string
    formLayoutsPage: string
}

export const test = base.extend<TestOptions> ({
    globalSQAUrl : ['', {option: true}],
    formLayoutsPage: async({page}, use) => {
        await page.goto('/')
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
        await use('')
        console.log('Tear down')
    }
})