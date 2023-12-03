import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    // drug_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'test' }],
    Name: String,
});

export default userSchema;