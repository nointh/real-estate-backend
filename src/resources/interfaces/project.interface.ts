import { Document } from 'mongoose'

export default interface IProject extends Document{
    _id: string,
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
}