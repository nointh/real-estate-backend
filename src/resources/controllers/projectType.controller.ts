import { Router, Request, Response, NextFunction } from "express"
import Controller from "@/utils/interface/controller.interface"
import HttpException from "@/utils/exceptions/http.exception"
import ProjectTypeService from "../services/projectType.service"

class ProjectTypeController implements Controller {
  public path = "/a/project-type"
  public router = Router()
  private ProjectTypeService = new ProjectTypeService()

  constructor() {
    this.initialiseRoutes()
  }
  private initialiseRoutes() {
    this.router.get(
        `${this.path}/get`,
        this.get
    )
  }

  private get = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
        const typeId = req.query.id?.toString()

        let data = undefined

        if (typeId != undefined) {
            data = await this.ProjectTypeService.get(typeId)
        } else {
            data = await this.ProjectTypeService.getAll()
        }

        res.status(201).json({ data })
    } catch (error: any) {
      next(new HttpException(400, error.message))
    }
  }
}

export default ProjectTypeController