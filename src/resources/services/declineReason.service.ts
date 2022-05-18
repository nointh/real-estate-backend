import declineReasonModel from "../models/declineReason.model"

class DeclineReasonService {
  private declineReason = declineReasonModel

  public async get(id: string): Promise<any> {
    try {
      const res = await this.declineReason.findById(id)

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
      const types = await this.declineReason.find({}).exec()

      return types
    } catch (error) {
      throw new Error("Unable to get reasons")
    }
  }
}

export default DeclineReasonService
