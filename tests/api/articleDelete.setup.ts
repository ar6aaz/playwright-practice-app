import {test as setup, expect} from '@playwright/test'
import { env } from 'process'

setup('delete article', async({request}) => {
    const postDeletionResponse = await request.delete(
        `https://conduit-api.bondaracademy.com/api/articles/${process.env.SLUGID}`
    )
    expect(postDeletionResponse.status()).toEqual(204)
})