import mongoose, { Model, Models } from "mongoose";
import bcryptjs from "bcryptjs";

export interface UserTypes {
    _id:mongoose.Schema.Types.ObjectId;
    name:string;
    email:string;
    password:string;
    role:"user"|"admin";
    isVarified:boolean;
    varificationToken:string;
    avatar?:string;
    createdAt:string;
    updatedAt:string;
};
export type RegisterBodyTypes = Pick<UserTypes, "name"|"email"|"password">;
export type LoginBodyTypes = Pick<UserTypes, "email"|"password">;

const userSchema = new mongoose.Schema<UserTypes>({
    name:{type:String, required:true},
    email:{type:String, unique:true, required:true},
    password:{type:String, required:true, select:false},
    role:{type:String, enum:["user","admin"], default:"user"},
    isVarified:{type:Boolean, default:false},
    varificationToken:{type:String, default:null},
    avatar:{type:String, default:null}
}, {timestamps:true});

userSchema.pre("save", async function() {
    try {
        const originalPassword = this.password;
        if (!originalPassword) throw Error("originalPassword is undefined");
        const BCRYPTJS_SALT = process.env.BCRYPTJS_SALT;
        if (!BCRYPTJS_SALT) throw Error("BCRYPTJS_SALT is undefined");
        const saltRounds = parseInt(BCRYPTJS_SALT, 7);
        const hashPassword = await bcryptjs.hash(originalPassword, saltRounds);
        this.password = hashPassword;
        return hashPassword;
    } catch (error) {
        console.log(error);
        throw error;
    }
})

const userModel:Model<UserTypes> = mongoose.models.User || mongoose.model<UserTypes>("User", userSchema);

export default userModel;