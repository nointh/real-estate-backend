import { Schema, model } from 'mongoose'
import Post from '@/resources/interfaces/post.interface'
import { number, object } from 'joi'

const PostSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        ownerId: {
            type: String,
            required: true
        },
        postType: {
            type: {
                _id: {
                    type: String,
                },
                name: {
                    type: String
                }
            },
            required: true
        },
        estateType: {
            type: {
                _id: {
                    type: String,
                },
                name: {
                    type: String
                }
            },
            required: true
        },
        forSaleOrRent: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        },
        location: {
            CityCode: {
                type: String,
                required: true
            },
            CityName: {
                type: String,
                required: true
            },
            DistrictId: {
                type: Number,
                required: true
            },
            DistrictName: {
                type: String,
                required: true
            },
            DistrictPrefix: {
                type: String
            },
            Label: {
                type: String
            },
            ShortName: {
                type: String
            },
            StreetId: {
                type: Number
            },
            StreetName: {
                type: String
            },
            StreetPrefix: {
                type: String
            },
            TextSearch: {
                type: String
            },
            WardId: {
                type: Number
            },
            WardName: {
                type: String
            },
            WardPrefix: {
                type: String
            } 
        },
        cor: {
            lat: {
                type: Number
            },
            Lng: {
                type: Number
            }
        },
        belongToProject: {
            projectId: {
                type: Number
            },
            projectName: {
                type: String
            }
        },
        description: {
            type: String
        },
        images: [ {
            type: String
        } ],
        legalDocuments: {
            type: String
        },
        publishedDate: {
            type: String
        },
        expiredDate: {
            type: String
        },
        price: {
            type: Number
        },
        priceType: {
            type: String
        },
        area: {
            type: Number
        },
        floorNumber: {
            type: Number
        },
        bathroomNumber: {
            type: Number
        },
        bedroomNumber: {
            type: Number
        },
        direction: {
            type: String
        },
        furniture: {
            type: String
        },
        width: {
            type: Number
        },
        depth: {
            type: Number
        },
        roadWidth: {
            type: Number
        },
        facade: {
            type: Number
        }
    },
    {
        timestamps: true
    }
)
export default model<Post>("Post", PostSchema)