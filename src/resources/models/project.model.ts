import { Schema, model } from 'mongoose'
import IProject from '../interfaces/project.interface'
import mongoose from 'mongoose'
const slug = require('mongoose-slug-generator')
mongoose.plugin(slug)

const ProjectSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        investorId: {
            type: String,
            required: true
        },
        postTypeId: {
            type: String,
            required: true
        },
        projectTypeId: {
            type: String,
            required: true
        },
        projectStatus: {
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
                type: String,
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
                type: String
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
                type: String
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
        description: [{
            type: {
                type: String
            },
            content: {
                type: String
            },
            caption: {
                type: String
            }
        }],
        images: [ {
            type: String
        } ],
        utilities: [ {
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
        area: {
            type: Number
        },
        aparmentNumber: {
            type: Number
        },
        buildingNumber: {
            type: Number
        },
        estimatedStartTime: {
            type: String
        },
        estimatedCompletionTime: {
            type: String
        },
        density: {
            type: Number
        },
        slug: {
            type:String,
            slug: "slug",
            unique: true
        },
        declineReasonId: {
            type: String,
        }
    },
    {
        timestamps: true
    }
)
ProjectSchema.pre('save', async function (next) {
    if (!this.isModified("name"))
        return next()
    this.slug = normalizedVNString(this.name)

    next()
})

const normalizedVNString = (str:string) =>{
    return str.normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D");
}

export default model<IProject>("Project", ProjectSchema)