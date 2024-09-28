import { model, Schema } from "mongoose";

export interface Jewellery{
    id:string;
    name:string;
    imageDis:string;
    imageHov:string;
    description:string;
    metalType:string[];
    category:string[];
    weight:number;
    makingCost:number;
    stoneCarat:number;
    wastage:number;
    featured:string;
}

export const ProductSchema = new Schema<Jewellery>(
    {
        name:{type:String, required:true},
        imageDis:{type:String, required:true},
        imageHov:{type:String, required:true},
        description:{type:String},
        metalType:{type:[String], required:true},
        category:{type:[String], required:true},
        weight:{type:Number, required:true},
        makingCost:{type:Number, required:true},
        stoneCarat:{type:Number},
        wastage:{type:Number},
        featured:{type:String}
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

export const ProductsModel = model<Jewellery>('products', ProductSchema)