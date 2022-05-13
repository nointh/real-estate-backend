import PostModel from "@/resources/models/post.model"
import IPost from "@/resources/interfaces/post.interface"
import postDtoInterface, { parsePostDto } from "../interfaces/postDto.interface"
import userModel from "../models/user.model"
import postTypeModel from "../models/postType.model"
import estateTypeModel from "../models/estateType.model"
import priceUnitModel from "../models/priceUnit.model"

class PostService {
  private post = PostModel
  private user = userModel
  private postType = postTypeModel
  private estateType = estateTypeModel
  private priceUnit = priceUnitModel

  public async create(
    title: string,
    address: string,
    ownerId: string,
    postTypeId: string,
    estateTypeId: string,
    forSaleOrRent: string,
    status: string,
    location: {
      CityCode: string
      CityName: string
      DistrictId: number
      DistrictName: string
      DistrictPrefix: string
      Label: string
      ShortName: string
      StreetId: number
      StreetName: string
      StreetPrefix: string
      TextSearch: string
      WardId: number
      WardName: string
      WardPrefix: string
    },
    cor: {
      lat: number
      Lng: number
    },
    description: string,
    images: [string],
    legalDocuments: string,
    publishedDate: string,
    expiredDate: string,
    approvedDate: string,
    reviewExpireDate: string,
    price: number,
    priceType: string,
    area: number,
    floorNumber: number,
    bathroomNumber: number,
    bedroomNumber: number,
    direction: string,
    furniture: string,
    width: number,
    depth: number,
    roadWidth: number,
    facade: number,
    belongToProject: {
      projectId: number
      projectName: string
    }
  ): Promise<string | Error> {
    try {
      const post = await this.post.create({
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
        approvedDate,
        reviewExpireDate,
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
        belongToProject,
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
      let post = await this.post.findById(_id)
      let owner = await this.user.findById(post?.ownerId)
      let postType = await this.postType.findById(post?.postTypeId)
      let estateType = await this.estateType.findById(post?.estateTypeId)
      let priceUnit = await this.priceUnit.findById(post?.priceType)

      let postDto = parsePostDto(post)
      postDto.owner.name = owner?.fullname || ''
      postDto.owner.phone = owner?.phone || ''
      postDto.postType.name = postType?.name || ''
      postDto.postType.title_color = postType?.title_color || ''
      postDto.estateType = estateType?.name || ''
      postDto.priceType = priceUnit?.label || ''

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

  public async getListPostByPurpose(purpose: any): Promise<any> {
    try {
      let docs = await this.post.find({ forSaleOrRent: purpose }).exec()
      var dataDtos: postDtoInterface[] = []

      for (let index = 0; index < docs.length; index++) {
        const element = docs[index]

        let owner = await this.user.findById(element?.ownerId)
        let postType = await this.postType.findById(element?.postTypeId)
        let estateType = await this.estateType.findById(element?.estateTypeId)
        let priceUnit = await this.priceUnit.findById(element?.priceType)

        let postDto = parsePostDto(element)
        postDto.owner.name = owner?.fullname || ''
        postDto.owner.phone = owner?.phone || ''
        postDto.postType.name = postType?.name || ''
        postDto.postType.title_color = postType?.title_color || ''
        postDto.estateType = estateType?.name || ''
        postDto.priceType = priceUnit?.label || ''

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

  public async getListPostByStatus(status: any): Promise<any> {
    try {
      let docs = await this.post.find({ status: status }).exec()
      var dataDtos: postDtoInterface[] = []

      for (let index = 0; index < docs.length; index++) {
        const element = docs[index]

        let owner = await this.user.findById(element?.ownerId)
        let postType = await this.postType.findById(element?.postTypeId)
        let estateType = await this.estateType.findById(element?.estateTypeId)
        let priceUnit = await this.priceUnit.findById(element?.priceType)

        let postDto = parsePostDto(element)
        postDto.owner.name = owner?.fullname || ''
        postDto.owner.phone = owner?.phone || ''
        postDto.postType.name = postType?.name || ''
        postDto.postType.title_color = postType?.title_color || ''
        postDto.estateType = estateType?.name || ''
        postDto.priceType = priceUnit?.label || ''

        dataDtos.push(postDto)
      }

      if (docs) {
        return dataDtos
      } else {
        throw new Error("Cannot get post list")
      }
    } catch (error) {
      throw new Error("Unable to get post list")
    }
  }

  public async delete(_id: any): Promise<any> {
    try {
      let result = await this.post.findByIdAndDelete(_id)

      if (result) {
        return result
      } else {
        throw new Error("Cannot delete post")
      }
    } catch (error) {
      throw new Error("Unable to delete post")
    }
  }

  public async approve(_id: string): Promise<any> {
    try {
      let post = await this.post.findOne({ _id: _id })

      if (post) {
        let result = await post.update({
          $set: {
            status: "approved",
          },
        })
        return result
      } else {
        throw new Error("Cannot find post")
      }
    } catch (error) {
      throw new Error("Unable to approve post:")
    }
  }

  public async decline(_id: string): Promise<any> {
    try {
      let post = await this.post.findOne({ _id: _id })

      if (post) {
        let result = await post.update({
          $set: {
            status: "declined",
          },
        })
        return result
      } else {
        throw new Error("Cannot find post")
      }
    } catch (error) {
      throw new Error("Unable to decline post")
    }
  }

  public async terminate(_id: string): Promise<any> {
    try {
      let post = await this.post.findOne({ _id: _id })

      if (post) {
        let result = await post.update({
          $set: {
            status: "terminated",
          },
        })
        return result
      } else {
        throw new Error("Cannot find post")
      }
    } catch (error) {
      throw new Error("Unable to terminate post")
    }
  }
}
export default PostService
