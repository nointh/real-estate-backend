import { Document } from 'mongoose'
import IPost from './post.interface'

export default interface PostDto{
    _id: string,
    title: string,
    address: string,
    owner: {
        name: string,
        avatar: string,
        email: string,
        phone: string
    },
    postType: string,
    estateType: string,
    forSaleOrRent: string,
    location: {
        CityName: string,
        DistrictName: string,
        DistrictPrefix: string,
        Label: string,
        StreetName: string,
        StreetPrefix: string,
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

// export const parsePostDto = (post: Post) : PostDto =>{
//     return {
        
//     }
// }