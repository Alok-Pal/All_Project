import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
    
//     first_name: String ,
//     last_name: String,
//     email: String,
//     gender: String
// });

var userSchema = new mongoose.Schema({

}, { strict: false });

export default userSchema;