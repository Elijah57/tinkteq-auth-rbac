import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs"

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true,
        trim: true
    },

    lastname: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    phone: {
        type: String,
        required: true,
        trim: true
    },

    role: {
        type: String,
        enum: ["admin","shipper", "carrier"],
        required: true,
        trim: true
    },

    password_hash: {
        type: String,
        required: false
    },

    verified: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
})

userSchema.index({ role: 1})


userSchema.pre("save", async function (next){
    if(!this.isModified("password_hash")){
        return next()
    }

    if (typeof this.password_hash === "string"){
        this.password_hash = await bcrypt.hash(this.password_hash, 10)
        return next()
    }
})


const User = model("User", userSchema)
export default User