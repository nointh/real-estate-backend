import projectTypeModel from "../models/projectType.model"

class ProjectTypeService {
  private projectType = projectTypeModel

  public async get(id: string): Promise<any> {
    try {
      const res = await this.projectType.findById(id)

      if (res) {
        return res
      } else {
        throw new Error("Cannot find object")
      }
    } catch (error: any) {
      throw new Error(error)
    }
  }

  public async getAll(): Promise<any> {
    try {
      const types = await this.projectType.find({}).exec()

      return types
    } catch (error) {
      throw new Error("Unable to get project types")
    }
  }
}

export default ProjectTypeService
