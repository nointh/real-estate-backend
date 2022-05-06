import 'dotenv/config'
import 'module-alias/register'
import App from './app'
import PostController from './resources/controllers/post.controller'
import validateEnv from '@/utils/validateEnv'
// import PostController from '@/resources/post/post.controller'
import UserController from '@/resources/controllers/user.controller'
validateEnv()

const app = new App([
    new PostController(),
    new UserController(),
], Number(process.env.PORT))

app.listen()