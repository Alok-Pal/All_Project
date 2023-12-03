import mongoose from "mongoose";
import userSchema from "./Schema";


const User = mongoose.model('User', userSchema)

export default User