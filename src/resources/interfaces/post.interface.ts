import { Document } from 'mongoose'
export default interface Post extends Document{
    _id: string,
    title: string,
    address: string,
    owner: {
        _id: string,
        name: string,
        avatar: string,
        email: string,
        phone: string
    },
    estateType: {
        _id: string,
        name: string
    },
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
    facade: number
}