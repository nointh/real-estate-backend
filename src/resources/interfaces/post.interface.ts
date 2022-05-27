import { Document } from 'mongoose'

export default interface IPost extends Document{
    _id: string,
    title: string,
    address: string,
    ownerId: string,
    postTypeId: string,
    estateTypeId: string,
    status: string,
    forSaleOrRent: string,
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
    belongToProject: {
        projectId: number,
        projectName: null
    },
    description: string,
    images: [ string ],
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
    funiture: string,
    width: number,
    depth: number,
    roadWidth: number,
    facade: number,
    slug: string,
    declineReasonId: string,
    views: number
}