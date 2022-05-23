import { Document } from 'mongoose'
import IPost from './post.interface'

export default interface PostDto{
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
    status: string,
    postType: {
        name: string,
        title_color: string
    },
    estateType: {
        name: string,
        slug: string
    },
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
}

export const parsePostDto = (post: any) : PostDto =>{
    return {
        _id: post._id,
        title: post.title,
        address: post.address,
        owner: {
            _id: post.ownerId,
            name: post._id,
            avatar: post._id,
            email: post._id,
            phone: post._id
        },
        status: post.status,
        postType: {
            name: post.postTypeId,
            title_color: post.postTypeId
        },
        estateType: {
            name: post.estateTypeId,
            slug: post.estateTypeId
        },
        forSaleOrRent: post.forSaleOrRent,
        location: {
            CityName: post.location.CityName,
            DistrictName: post.location.DistrictName,
            DistrictPrefix: post.location.DistrictPrefix,
            Label: post.location.Label,
            StreetName: post.location.StreetName,
            StreetPrefix: post.location.StreetPrefix,
            WardName: post.location.WardName,
            WardPrefix: post.location.WardPrefix
        },
        cor: {
            lat: post.cor.lat,
            Lng: post.cor.Lng
        },
        belongToProject: {
            projectId: post.belongToProject.projectId,
            projectName: post.belongToProject.projectName
        },
        description: post.description,
        images: post.images,
        legalDocuments: post.legalDocuments,
        publishedDate: post.publishedDate,
        expiredDate: post.expiredDate,
        approvedDate: post.approvedDate,
        reviewExpireDate: post.reviewExpireDate,
        price: post.price,
        priceType: post.priceType,
        area: post.area,
        floorNumber: post.floorNumber,
        bathroomNumber: post.bathroomNumber,
        bedroomNumber: post.bedroomNumber,
        direction: post.direction,
        furniture: post.funiture,
        width: post.width,
        depth: post.depth,
        roadWidth: post.roadWidth,
        facade: post.facade,
        slug: post.slug,
        declineReasonId: post.declineReasonId
    }
}