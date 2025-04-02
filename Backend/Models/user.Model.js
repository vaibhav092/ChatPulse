import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema=new Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true
        },
        email:{
            type:String,
            required:true,
            lowercase:true,
            trim:true
        },
        password:{
            type:String,
            required:true,
        },
        pfp:{
            type:String,
            required:true
        },
        onlineStatus: {
            type: Boolean,
            required: true,
            default: false 
        },
        contacts: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
        refreshToken: {
            type: String
        }
    },{timestamps:true}
)

userSchema.pre("save",async function (next) {
    if(!this.isModified("password"))next();

    this.password=await bcrypt.hash(this.password,5)
    next()
})

userSchema.method.isPasswordCorrect=async function (password) {
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        { id: this._id, username: this.username },
        process.env.JWT_SECRET,
        { expiresIn: "30m" } 
    );
};

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        { id: this._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" } 
    );
};


export const User = mongoose.model('User', userSchema);