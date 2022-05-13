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
            `${this.path}/multiple`,
            this.uploadMultipleImages
        )
    }

    private uploadMultipleImages = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { files } = req.body

            let data = new Array()

            if (files != undefined) {
                for (let index = 0; index < files.length; index++) {
                    await
                    cloudinary.uploader
                    .upload(files[index], {
                        resource_type: "image",
                        upload_preset: "ktld7qkm"
                    })
                    .then((result) => {
                        data.push(result.url)
                    })
                    .catch((error) => {
                        console.log("Error", JSON.stringify(error))
                    })
                }
                console.log(data)
            } else {
                //data = await this.EstateTypeService.getAll()
            }

            res.status(201).json({ data })
        } catch (error: any) {
            next(new HttpException(400, error.message))
        }
    }

    private uploadSingleImage = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { file } = req.body

            let data = undefined

            cloudinary.uploader
            .upload(file, {
                resource_type: "image",
                upload_preset: "ktld7qkm"
            })
            .then((result) => {
                data = JSON.stringify(result.url)
            })
            .catch((error) => {
                console.log("Error", JSON.stringify(error))
            })

            res.status(201).json({ data })
        } catch (error: any) {
            next(new HttpException(400, error.message))
        }
    }
}
export default ImageUploaderController