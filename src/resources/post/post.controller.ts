import {Router, Request, Response, NextFunction} from 'express'
import Controller from '@/utils/interface/controller.interface'
import HttpException from '@/utils/exceptions/http.exception'
import validateMiddleware from '@/middleware/validation.midldeware'
import validate from '@/resources/post/post.validation'
import PostService  from '@/resources/post/post.service'

class PostController implements Controller{
    public path = "/posts";
    public router = Router();
    public PostService = new PostService()
    constructor(){
        this.initialiseRoutes()
    }
    private initialiseRoutes(): void{
        this.router.post(
            `${this.path}`,
            validateMiddleware(validate.create),
            this.create
        )
    }
    private create = async(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> =>{
        try{
            const { title, body } = req.body;
            const post = await this.PostService.create(title, body)
            res.status(201).json({ post })
        }
        catch(error: any)
        {
            next(new HttpException(4000, "Cannot create post"))
        }
    }
}
export default PostController