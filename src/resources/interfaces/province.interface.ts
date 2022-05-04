import { Document } from "mongoose"

export default interface IProvince extends Document {
  _id: string
  cityName: string
  slug: string
}

export default interface IDistrict extends Document {
  districtCode: string
  districtName: string
  prefix: string
  provinceNameId: string
}

export default interface IWard extends Document {
  wardCode: string
  wardName: string
  prefix: string
  districtId: string
}

export default interface IStreet extends Document {
  streetCode: string
  streetName: string
  prefix: string
  districtId: string
}
