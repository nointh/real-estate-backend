import { Router, Request, Response, NextFunction } from "express"
import Controller from "@/utils/interface/controller.interface"
import HttpException from "@/utils/exceptions/http.exception"
import ProjectService from "../services/project.service"

class ProjectController implements Controller {
  public path = "/project"
  public router = Router()
  private ProjectService = new ProjectService()

  constructor() {
    this.initialiseRoutes()
  }
  private initialiseRoutes() {
    this.router.post(`${this.path}/upload`, this.create)
    this.router.get(`${this.path}/get`, this.get)
    this.router.get(`${this.path}/count`, this.count)

    this.router.get(`${this.path}/slug`, this.getSlug)
  }

  private create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const {
        name,
        address,
        investorId,
        postTypeId,
        projectTypeId,
        status,
        projectStatus,
        manager,
        constructor,
        location,
        cor,
        description,
        images,
        utilities,
        legalDocuments,
        publishedDate,
        expiredDate,
        estimatedStartTime,
        estimatedCompletionTime,
        price,
        area,
        aparmentNumber,
        buildingNumber,
        density,
        declineReasonId,
        slug,
      } = req.body
      const token = await this.ProjectService.create(
        name,
        address,
        investorId,
        postTypeId,
        projectTypeId,
        status,
        projectStatus,
        manager,
        constructor,
        location,
        cor,
        description,
        images,
        utilities,
        legalDocuments,
        publishedDate,
        expiredDate,
        estimatedStartTime,
        estimatedCompletionTime,
        price,
        area,
        aparmentNumber,
        buildingNumber,
        density,
        declineReasonId,
        slug
      )
      res.status(201).json({ token })
    } catch (error: any) {
      next(new HttpException(400, error.message))
    }
  }

  private get = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      let projectId = req.query.id?.toString()
      let status = req.query.s?.toString()
      let postType = req.query.pt?.toString()
      let projectType = req.query.et?.toString()
      let ownerId = req.query.oid?.toString()
      let limit = parseInt(req.query.limit?.toString() || "32")
      let slug = req.query.slug?.toString()
      let page = parseInt(req.query.page?.toString() || "1")

      let data = undefined

      if (status == undefined) status = ""
      if (postType == undefined) postType = ""
      if (projectType == undefined) projectType = ""
      if (ownerId == undefined) ownerId = ""

      if (projectId != undefined) {
        data = await this.ProjectService.getDetail(projectId)
      } else if (slug != undefined) {
        data = await this.ProjectService.getWithSlug(slug)
      } else {
        data = await this.ProjectService.getWithParams(
          status,
          postType,
          projectType,
          ownerId,
          limit,
          page
        )
      }

      res.status(200).json({ data })
    } catch (error: any) {
      next(new HttpException(400, error.message))
    }
  }

  private count = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      let status = req.query.s?.toString() || ""

      let data = await this.ProjectService.count(status)

      res.status(200).json({ data })
    } catch (error: any) {
      next(new HttpException(400, error.message))
    }
  }

  private getSlug = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const data = await this.ProjectService.getSlugs()
      res.status(200).json({ data })
    } catch (error: any) {
      next(new HttpException(400, error.message))
    }
  }
}
export default ProjectController
