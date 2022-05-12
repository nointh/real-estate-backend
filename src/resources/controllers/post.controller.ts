import { Router, Request, Response, NextFunction } from 'express'
import Controller from '@/utils/interface/controller.interface'
import HttpException from '@/utils/exceptions/http.exception'
import validationMiddleware from '@/middleware/validation.midldeware'
import PostService from '../services/post.service'

class PostController implements Controller{
    public path = "/post"
    public router = Router()
    private PostService = new PostService()

    constructor(){
        this.initialiseRoutes()
    }
    private initialiseRoutes(){
        this.router.post(
            `${this.path}/upload`,
            this.create
        )
        this.router.get(
            `${this.path}/get`,
            this.getDetail
        )
        this.router.get(
            `${this.path}/list-post-by-purpose`,
            this.getListPostByPurpose
        )
        this.router.get(
            `${this.path}/list-post-by-status`,
            this.getListPostByStatus
        )
        this.router.post(
            `${this.path}/delete`,
            this.delete
        )
    }
    private create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const {
                title,
                address,
                ownerId,
                postTypeId,
                estateTypeId,
                forSaleOrRent,
                status,
                location,
                cor,
                description,
                images,
                legalDocuments,
                publishedDate,
                expiredDate,
                price,
                priceType,
                area,
                floorNumber,
                bathroomNumber,
                bedroomNumber,
                direction,
                furniture,
                width,
                depth,
                roadWidth,
                facade,
                belongToProject
            } = req.body
            const token = await this.PostService.create(
                title,
                address,
                ownerId,
                postTypeId,
                estateTypeId,
                forSaleOrRent,
                status,
                location,
                cor,
                description,
                images,
                legalDocuments,
                publishedDate,
                expiredDate,
                expiredDate,
                expiredDate,
                price,
                priceType,
                area,
                floorNumber,
                bathroomNumber,
                bedroomNumber,
                direction,
                furniture,
                width,
                depth,
                roadWidth,
                facade,
                belongToProject
            )
            res.status(201).json({ token })
        } catch( error :any ){
            next(new HttpException(400, error.message))
        }
    }
    private getDetail = async ( 
        req: Request,
        res: Response,
        next: NextFunction
    ) : Promise<Response | void> => {
        try {
            let postId = req.query.id?.toString()
            const token = await this.PostService.getDetail(postId)

            res.status(200).json({ token })
        } catch( error:any ){
            next(new HttpException(400, error.message))
        }
    }
    private getListPostByPurpose = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) : Promise<Response | void> => {
        try {
            let purpose = req.query.purpose?.toString()
            const data = await this.PostService.getListPostByPurpose(purpose)

            res.status(200).json({ data })
        } catch( error:any ){
            next(new HttpException(400, error.message))
        }
    }
    private getListPostByStatus = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) : Promise<Response | void> => {
        try {
            let status = req.query.status?.toString()
            const data = await this.PostService.getListPostByStatus(status)

            res.status(200).json({ data })
        } catch( error:any ){
            next(new HttpException(400, error.message))
        }
    }
    private delete = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) : Promise<Response | void> => {
        try {
            let postId = req.query.id?.toString()
            const token = await this.PostService.delete(postId)

            res.status(200).json({ token })
        } catch( error:any ){
            next(new HttpException(400, error.message))
        }
    }
}
export default PostController