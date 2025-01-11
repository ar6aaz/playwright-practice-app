import {test as setup, expect} from '@playwright/test'

setup('create new article', async({request}) => {
    const postCreationReponse = await request.post(
        'https://conduit-api.bondaracademy.com/api/articles/', {
        data:{"article":{"title":"Likes test","description":"desc","body":"content","tagList":[]}}
    })
    expect(postCreationReponse.status()).toEqual(201)
    const responseJSON = await postCreationReponse.json()
    const slugId = responseJSON.article.slug
    process.env.SLUGID = slugId

})