import PostModel from "@/resources/models/post.model"
import Post from "@/resources/interfaces/post.interface"
import { title } from "process"

class PostService {
  private post = PostModel

  public async create(
    title: string,
    address: string,
    ownerId: string,
    postType: {
      _id: string,
      name: string,
    },
    estateType: {
      _id: string,
      name: string,
    },
    forSaleOrRent: string,
    status: string,
    location: {
      CityCode: string,
      CityName: string,
      DistrictId: number,
      DistrictName: string,
      DistrictPrefix: string,
      Label: string,
      ShortName: string,
      StreetId: number,
      StreetName: string,
      StreetPrefix: string,
      TextSearch: string,
      WardId: number,
      WardName: string,
      WardPrefix: string
    },
    cor: {
      lat: number,
      Lng: number
    },
    description: string,
    images: [string],
    legalDocuments: string,
    publishedDate: string,
    expiredDate: string,
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
      projectId: number,
      projectName: string
    }): Promise<string | Error> {
    try {
      const post = await this.post.create({
        title,
        address,
        ownerId,
        postType,
        estateType,
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

      if (post) {
        return post
      } else {
        throw new Error("Cannot find post")
      }
    } catch (error) {
      throw new Error("Unable to approve post")
    }
  }

  public async getListPostByPurpose(purpose: any): Promise<any> {
    try {
      let docs = await this.post.find({ forSaleOrRent: purpose }).exec()

      if (docs) {
        return docs
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
      let post = await this.post.findById(_id)

      if (post) {
        post.update(
          {
            $set: {
              status: "publish",
            },
          },
          () => {
            return "Success"
          }
        )
      } else {
        throw new Error("Cannot find post")
      }
    } catch (error) {
      throw new Error("Unable to approve post")
    }
  }
  
  public async decline(_id: string): Promise<any> {
    try {
      let post = await this.post.findById(_id)

      if (post) {
        post.update(
          {
            $set: {
              status: "declined",
            },
          },
          () => {
            return "Success"
          }
        )
      } else {
        throw new Error("Cannot find post")
      }
    } catch (error) {
      throw new Error("Unable to decline post")
    }
  }
}
export default PostService
