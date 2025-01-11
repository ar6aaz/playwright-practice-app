import {request, expect} from '@playwright/test'
import fs from 'fs'
const authFile = 'tests/.auth/user.json'
const user = JSON.parse(fs.readFileSync(authFile, 'utf-8'));

async function globalSetup() {
    const context = await request.newContext();

    const response = await context.post('https://conduit-api.bondaracademy.com/api/users/login', {
        data: {"user":{"email":"conduit123@test.com","password":"conduit123"}}
    })
    const authResponseJSON = await response.json()
    const authToken = authResponseJSON.user.token
    user.origins[0].localStorage[0].value = authToken
    fs.writeFileSync(authFile, JSON.stringify(user, null, 2));
    process.env.AUTH_TOKEN = authToken;


    const postCreationReponse = await context.post(
        'https://conduit-api.bondaracademy.com/api/articles/', {
        data:{"article":{"title":"Global Likes test","description":"desc","body":"content","tagList":[]}},
        headers:{
            Authorization: `Token ${process.env.AUTH_TOKEN}`
        }
    })
    expect(postCreationReponse.status()).toEqual(201)
    const responseJSON = await postCreationReponse.json()
    const slugId = responseJSON.article.slug
    process.env.SLUGID = slugId
}

export default globalSetup;