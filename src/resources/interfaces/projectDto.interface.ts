import { Document } from 'mongoose'

export default interface ProjectDto{
    _id: string,
    name: string,
    address: string,
    postType: {
        name: string,
        title_color: string,
    },
    projectType: string,
    investor: {
        name: string,
        phone: string,
        avatar: string
    },
    status: string,
    projectStatus: string,
    manager: string,
    constructor: string,
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
    declineReason: string,
    slug: string,
}

export const parseProjectDto = (project: any) : ProjectDto =>{
    return {
        _id: project._id,
        name: project.name,
        address: project.address,
        postType: {
            name: project.name,
            title_color: project.name,
        },
        projectType: project.projectTypeId,
        investor: {
            name: project.name,
            phone: project.name,
            avatar: project.name
        },
        status: project.status,
        projectStatus: project.projectStatus,
        manager: project.manager,
        constructor: project.constructor,
        location: {
            CityName: project.location.CityName,
            DistrictName: project.location.DistrictName,
            DistrictPrefix: project.location.DistrictPrefix,
            Label: project.location.Label,
            StreetName: project.location.StreetName,
            StreetPrefix: project.location.StreetPrefix,
            WardName: project.location.WardName,
            WardPrefix: project.location.WardPrefix
        },
        cor: {
            lat: project.cor.lat,
            Lng: project.cor.Lng
        },
        description: project.description,
        images: project.images,
        utilities: project.utilities,
        legalDocuments: project.legalDocuments,
        publishedDate: project.publishedDate,
        expiredDate: project.expiredDate,
        estimatedStartTime: project.estimatedStartTime,
        estimatedCompletionTime: project.estimatedCompletionTime,
        price: project.price,
        area: project.area,
        aparmentNumber: project.aparmentNumber,
        buildingNumber: project.buildingNumber,
        density: project.density,
        declineReason: project.declineReasonId,
        slug: project.slug,
    }
}