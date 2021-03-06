import "dotenv/config"
import "module-alias/register"
import App from "./app"
import "dotenv/config"
import "module-alias/register"
import validateEnv from "@/utils/validateEnv"
import UserPostController from "./resources/controllers/post.controller"
import PostController from "@/resources/controllers/admin/post.controller"
import ProvinceController from "./resources/controllers/address/province.controller"
import DistrictController from "./resources/controllers/address/district.controller"
import WardController from "./resources/controllers/address/ward.controller"
import StreetController from "./resources/controllers/address/street.controller"
import UserController from "@/resources/controllers/user.controller"
import AdminUserController from "@/resources/controllers/admin/user.controller"
import EstateTypeController from "./resources/controllers/estateType.controller"
import PostTypeController from "./resources/controllers/postType.controller"
import PriceUnitController from "./resources/controllers/priceUnit.controller"
import ImageUploaderController from "./resources/controllers/imageUploader.controller"
import DeclineReasonController from "./resources/controllers/declineReason.controller"
import ProjectTypeController from "./resources/controllers/projectType.controller"
import ProjectController from "./resources/controllers/project.controller"
import NewsController from "@/resources/controllers/news.controller"
import TransactionController from "@/resources/controllers/transaction.controller"

validateEnv()

const app = new App(
  [
    new PostController(),
    new UserController(),
    new UserPostController(),
    new ProvinceController(),
    new DistrictController(),
    new WardController(),
    new StreetController(),
    new EstateTypeController(),
    new PostTypeController(),
    new PriceUnitController(),
    new ImageUploaderController(),
    new DeclineReasonController(),
    new AdminUserController(),
    new ProjectTypeController(),
    new ProjectController(),
    new NewsController(),
    new TransactionController(),
  ],
  Number(process.env.PORT)
)

app.listen()
