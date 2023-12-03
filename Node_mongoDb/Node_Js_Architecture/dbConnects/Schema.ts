import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    // drug_id: [{ type: mongoose.Schema.Types.ObjectId , ref: 'Drug' }],
    first_name: String ,
    last_name: String,
    email: String,
    gender: String
});



export default  userSchema;