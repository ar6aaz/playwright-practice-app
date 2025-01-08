import {test as base} from '@playwright/test'

export type TestOptions = {
    globalSQAUrl : string
}

export const test = base.extend<TestOptions> ({
    globalSQAUrl : ['', {option: true}]
})