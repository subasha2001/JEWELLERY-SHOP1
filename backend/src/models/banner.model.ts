import { model, Schema } from "mongoose";

export interface banner{
    id:string;
    image:string;
}

export const BannerSchema = new Schema<banner>(
    {
        image:{type:String, required:true}
    },{
        toJSON:{
            virtuals:true
        },
        toObject:{
            virtuals:true
        },
        timestamps:true
    }
)

export const BannerModel = model<banner>('banner', BannerSchema)