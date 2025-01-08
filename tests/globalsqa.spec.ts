import {test} from "../test-options";

test('globalsqa test extending base config', async({page, globalSQAUrl}) => {
    await page.goto(globalSQAUrl)
})

test('env variable from dotenv', async({page}) => {
    await page.goto(process.env.URL)
})