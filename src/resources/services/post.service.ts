import PostModel from "@/resources/models/post.model"
import Post from "@/resources/interfaces/post.interface"
import { title } from "process"

class PostService {
  private post = PostModel

  public async create(title: string, body: string): Promise<Post> {
    try {
      const post = await this.post.create({ title, body })

      return post
    } catch (error) {
      throw new Error("Unable to create post")
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
