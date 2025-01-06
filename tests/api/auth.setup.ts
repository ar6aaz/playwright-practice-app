import {test as setup} from '@playwright/test'
import fs from 'fs'
const authFile = '../.auth/user.json'
const user = JSON.parse(fs.readFileSync(authFile, 'utf-8'));

setup('authentication', async ({request}) => {

    const response = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {data: {"user":{"email":"conduit123@test.com","password":"conduit123"}}})
    const responseJSON = await response.json()
    const authToken = responseJSON.user.token
    user.origins[0].localStorage[0].value = authToken
    fs.writeFileSync(authFile, JSON.stringify(user, null, 2));
    process.env.AUTH_TOKEN = authToken;

})