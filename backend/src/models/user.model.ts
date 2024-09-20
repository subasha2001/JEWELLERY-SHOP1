import { model, Schema } from "mongoose";

export interface User{
    id:string;
    email:string;
    password:string;
    name:string;
    address:string;
    isAdmin:boolean; //in server we dont save the token
}

export const UserSchema = new Schema<User>({
    name: {type:String, required:true},
    email:{type:String, required:true, unique:true},
    password: {type:String, required:true},
    isAdmin: {type:Boolean, required:true},
    address: {type:String, required:true},
},
{
    timestamps:true,
    toJSON:{
        virtuals:true
    },
    toObject:{
        virtuals:true
    }
});

export const UserModel = model<User>('user', UserSchema);