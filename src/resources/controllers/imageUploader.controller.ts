import { Router, Request, Response, NextFunction } from "express"
import Controller from "@/utils/interface/controller.interface"
import HttpException from "@/utils/exceptions/http.exception"
import { v2 as cloudinary } from 'cloudinary'

class ImageUploaderController implements Controller {
  public path = "/image-upload"
  public router = Router()

  constructor() {
    this.initialiseRoutes()
  }
  private initialiseRoutes() {
    this.router.post(
        `${this.path}/post`,
        this.upload
    )
  }

  private upload = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
        const { file } = req.body
        console.log("FILES: " + file)

        let data = undefined

        if (file != undefined) {
            cloudinary.uploader
            .upload(file, {
                resource_type: "image",
            })
            .then((result) => {
                data = result
                console.log("Success", JSON.stringify(result))
            })
            .catch((error) => {
                console.log("Error", JSON.stringify(error))
            })
        } else {
            //data = await this.EstateTypeService.getAll()
        }

        res.status(201).json({ data })
    } catch (error: any) {
      next(new HttpException(400, error.message))
    }
  }
}
export default ImageUploaderController