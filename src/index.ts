import "dotenv/config"
import "module-alias/register"
import App from "./app"
import validateEnv from "@/utils/validateEnv"
import PostController from "@/resources/controllers/admin/post.controller"
import ProvinceController from "./resources/controllers/address/province.controller"
import DistrictController from "./resources/controllers/address/district.controller"
import WardController from "./resources/controllers/address/ward.controller"
import StreetController from "./resources/controllers/address/street.controller"
import UserController from "@/resources/controllers/user.controller"
validateEnv()

const app = new App(
  [
    new PostController(),
    new UserController(),
    new ProvinceController(),
    new DistrictController(),
    new WardController(),
    new StreetController(),
  ],
  Number(process.env.PORT)
)

app.listen()
