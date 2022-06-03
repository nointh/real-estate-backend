import projectModel from "../models/project.model"
import projectDtoInterface, { parseProjectDto } from "../interfaces/projectDto.interface"
import userModel from "../models/user.model"
import postTypeModel from "../models/postType.model"
import projectTypeModel from "../models/projectType.model"

class ProjectService {
  private project = projectModel
  private user = userModel
  private postType = postTypeModel
  private projectType = projectTypeModel

  public async create(
    name: string,
    address: string,
    investorId: string,
    postTypeId: string,
    projectTypeId: string,
    status: string,
    projectStatus: string,
    manager: string,
    constructor: string,
    location: {
      CityCode: string,
      CityName: string,
      DistrictId: string,
      DistrictName: string,
      DistrictPrefix: string,
      Label: string,
      ShortName: null,
      StreetId: string,
      StreetName: string,
      StreetPrefix: string,
      TextSearch: string,
      WardId: string,
      WardName: null,
      WardPrefix: null
    },
    cor: {
      lat: number,
      Lng: number
    },
    description: [{
      type: string,
      content: string,
      caption: string
    }],
    images: [ string ],
    utilities: [ string ],
    legalDocuments: string,
    publishedDate: string,
    expiredDate: string,
    estimatedStartTime: string,
    estimatedCompletionTime: string,
    price: number,
    area: number,
    aparmentNumber: number,
    buildingNumber: number,
    density: number,
    declineReasonId: string,
    slug: string,
  ): Promise<string | Error> {
    try {
      const post = await this.project.create({
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
      })

      if (post) {
        return "Success! PostId = " + post.id.toString()
      } else {
        return "Fail to create post"
      }
    } catch (error: any) {
      throw new Error(`Unable to create post - Error: ${error}`)
    }
  }

  public async getDetail(_id: any): Promise<any> {
    try {
      let post = await this.project.findById(_id)
      let owner = await this.user.findById(post?.investorId)
      let postType = await this.postType.findById(post?.postTypeId)
      let projectType = await this.projectType.findById(post?.projectTypeId)

      let postDto = parseProjectDto(post)
      postDto.investor.name = owner?.fullname || ""
      postDto.investor.phone = owner?.phone || ""
      postDto.postType.name = postType?.name || ""
      postDto.postType.title_color = postType?.title_color || ""
      postDto.projectType.name = projectType?.name || ""
      postDto.projectType.slug = projectType?.slug || ""

      if (post) {
        return postDto
      } else {
        throw new Error("Cannot find post")
      }
    } catch (error) {
      console.log(error)
      throw new Error("Unable to approve post")
    }
  }

  public async getWithParams(
    status: string,
    postType: string,
    projectType: string,
    investorId: string,
    limit: number
  ): Promise<any> {
    try {
      let docs = await this.project.find({
        status: {
          $regex: new RegExp(status, "i"),
        },
        postTypeId: {
          $regex: new RegExp(postType, "i"),
        },
        projectTypeId: {
          $regex: new RegExp(projectType, "i"),
        },
        investorId: {
          $regex: new RegExp(investorId, "i"),
        },
      }).limit(limit)

      var dataDtos: projectDtoInterface[] = []

      for (let index = 0; index < docs.length; index++) {
        const element = docs[index]

        let owner = await this.user.findById(element?.investorId)
        let postType = await this.postType.findById(element?.postTypeId)
        let projectType = await this.projectType.findById(element?.projectTypeId)

        let postDto = parseProjectDto(element)
        postDto.investor.name = owner?.fullname || ""
        postDto.investor.phone = owner?.phone || ""
        postDto.postType.name = postType?.name || ""
        postDto.postType.title_color = postType?.title_color || ""
        postDto.projectType.name = projectType?.name || ""
        postDto.projectType.slug = projectType?.slug || ""

        dataDtos.push(postDto)
      }

      if (docs) {
        return dataDtos
      } else {
        throw new Error("Cannot get post list")
      }
    } catch (error) {
      console.log(error)
      throw new Error("Unable to get post list")
    }
  }
}
export default ProjectService
