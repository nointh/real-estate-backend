import PostModel from "@/resources/models/post.model"
import postDtoInterface, { parsePostDto } from "../interfaces/postDto.interface"
import userModel from "../models/user.model"
import postTypeModel from "../models/postType.model"
import estateTypeModel from "../models/estateType.model"
import priceUnitModel from "../models/priceUnit.model"
import TransactionService from "./transaction.service"

class PostService {
  private post = PostModel
  private user = userModel
  private postType = postTypeModel
  private estateType = estateTypeModel
  private priceUnit = priceUnitModel
  private transactionService = new TransactionService()

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
    slug: string,
    declineReasonId: string,
    belongToProject: {
      projectId: string
      projectName: string
    },
    views: number,
    payAmount: number
  ): Promise<string | Error> {
    try {
      const usr = await this.user.findById(ownerId)
      const ogBalance = usr?.balance || 0

      if (ogBalance > payAmount) {
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
          slug,
          declineReasonId,
          belongToProject,
          views,
        })
  
        if (post) {
          const newBalance = ogBalance - payAmount
          const detail = "Trừ tiền phí đăng bài"
          const type = "outcome"
          const status = "success"
          const transaction = await this.transactionService.add(ownerId, payAmount, newBalance, detail, type, status)
  
          if (transaction) {
            return "Success! PostId = " + post.id.toString()
          }
        }
      }
      return "Fail to create post"
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
      postDto.owner.name = owner?.fullname || ""
      postDto.owner.phone = owner?.phone || ""
      postDto.postType.name = postType?.name || ""
      postDto.postType.title_color = postType?.title_color || ""
      postDto.estateType.name = estateType?.name || ""
      postDto.estateType.slug = estateType?.slug || ""
      postDto.priceType = priceUnit?.label || ""

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

  public async getPostBySlug(slug: string | undefined): Promise<any> {
    try {
      if (slug == undefined) throw new Error("No slug available")
      let post = await this.post.findOne({ slug })
      let owner = await this.user.findById(post?.ownerId)
      let postType = await this.postType.findById(post?.postTypeId)
      let estateType = await this.estateType.findById(post?.estateTypeId)
      let priceUnit = await this.priceUnit.findById(post?.priceType)

      let postDto = parsePostDto(post)
      postDto.owner.name = owner?.fullname || ""
      postDto.owner.phone = owner?.phone || ""
      postDto.postType.name = postType?.name || ""
      postDto.postType.title_color = postType?.title_color || ""
      postDto.estateType.name = estateType?.name || ""
      postDto.estateType.slug = estateType?.slug || ""
      postDto.priceType = priceUnit?.label || ""

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

  public async getAllPostSlugs(): Promise<any> {
    try {
      let posts = await this.post.find()
      const filterPosts = posts.filter((element) => element?.slug)
      const result = await Promise.all(
        filterPosts.map(async (element) => {
          let postSlug = element?.slug
          let estateType = await this.estateType.findById(element?.estateTypeId)
          let purpose = element?.forSaleOrRent
          let typeSlug = ""
          if (purpose == "rent") typeSlug = "thue-" + estateType?.slug
          else typeSlug = "ban-" + estateType?.slug
          return {
            params: { estateTypeSlug: typeSlug, estatePostSlug: postSlug },
          }
        })
      )
      return result
    } catch (error) {
      console.log(error)
      throw new Error(`Unable to get post slug due to error: ${error}`)
    }
  }

  public async getWithParams(
    status: string,
    postType: string,
    estateType: string,
    ownerId: string,
    purpose: string,
  ): Promise<any> {
    try {
      let docs = await this.post
        .find({
          status: {
            $regex: new RegExp(status, "i"),
          },
          postTypeId: {
            $regex: new RegExp(postType, "i"),
          },
          estateTypeId: {
            $regex: new RegExp(estateType, "i"),
          },
          ownerId: {
            $regex: new RegExp(ownerId, "i"),
          },
          forSaleOrRent: {
            $regex: new RegExp(purpose, "i")
          }
        })
        .sort({ reviewExpireDate: 1 })

      var dataDtos: postDtoInterface[] = []

      for (let index = 0; index < docs.length; index++) {
        const element = docs[index]

        let owner = await this.user.findById(element?.ownerId)
        let postType = await this.postType.findById(element?.postTypeId)
        let estateType = await this.estateType.findById(element?.estateTypeId)
        let priceUnit = await this.priceUnit.findById(element?.priceType)

        let postDto = parsePostDto(element)
        postDto.owner.name = owner?.fullname || ""
        postDto.owner.phone = owner?.phone || ""
        postDto.postType.name = postType?.name || ""
        postDto.postType.title_color = postType?.title_color || ""
        postDto.estateType.name = estateType?.name || ""
        postDto.estateType.slug = estateType?.slug || ""
        postDto.priceType = priceUnit?.label || ""

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

  public async getAllPostOfUser(userId: string): Promise<any> {
    try {
      let docs = await this.post.find({ ownerId: userId })

      var dataDtos: postDtoInterface[] = []

      for (let index = 0; index < docs.length; index++) {
        const element = docs[index]

        let owner = await this.user.findById(element?.ownerId)
        let postType = await this.postType.findById(element?.postTypeId)
        let estateType = await this.estateType.findById(element?.estateTypeId)
        let priceUnit = await this.priceUnit.findById(element?.priceType)

        let postDto = parsePostDto(element)
        postDto.owner.name = owner?.fullname || ""
        postDto.owner.phone = owner?.phone || ""
        postDto.postType.name = postType?.name || ""
        postDto.postType.title_color = postType?.title_color || ""
        postDto.estateType.name = estateType?.name || ""
        postDto.estateType.slug = estateType?.slug || ""
        postDto.priceType = priceUnit?.label || ""

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

  public async getTotalPostOfCity(cityId: string): Promise<any> {
    try {
      let res = await this.post
        .where({ "location.CityCode": `${cityId}` })
        .count()

      if (res) {
        return res
      } else {
        return 0
      }
    } catch (error) {
      console.log(error)
      throw new Error("Unable to get post count")
    }
  }

  public async getTotalPostOfUser(userId: string): Promise<any> {
    try {
      let res = await this.post.where({ ownerId: `${userId}` }).count()

      if (res) {
        return res
      } else {
        return 0
      }
    } catch (error) {
      console.log(error)
      throw new Error("Unable to get post count")
    }
  }

  public async delete(_id: any): Promise<any> {
    try {
      let post = await this.post.findOne({ _id: _id })

      if (post) {
        let result = await post.update({
          $set: {
            status: "deleted",
          },
        })
        return result
      } else {
        throw new Error("Cannot find post")
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

  public async count(_id: string): Promise<any> {
    try {
      let posts = await this.post.find({
        "location.CityCode": _id,
      })

      if (posts) {
        return posts.length
      } else {
        throw new Error("Cannot find post")
      }
    } catch (error) {
      throw new Error("Unable to count post")
    }
  }

  public async view(id: string): Promise<any> {
    try {
      console.log(id)

      let post = await this.post.findOne({ id: id })

      if (post) {
        let v = post?.views
        v += 1
        console.log(v)
        let result = await this.post.updateOne(
          { id: id },
          {
            $set: {
              views: v,
            },
          }
        )

        return result
      }
    } catch (error) {
      console.log(error)
      throw new Error("Unable to get post count")
    }
  }
}
export default PostService
