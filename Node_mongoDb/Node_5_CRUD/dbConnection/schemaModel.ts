import userSchema from "./schema";
import mongoose from "mongoose";

//WITH INTERFACES
// interface User {

//     first_name:string
//     last_name:string
//     email:string
//     gender:string
// }

// const User = mongoose.model<User>('Employees_Details', userSchema)


//const User = mongoose.model('customer_details', userSchema)

// const userSchema = new mongoose.Schema({

//     Company_id: mongoose.Schema.Types.ObjectId ,
//     last_name: String,
//     email: String,
//     Customer_Invoices_id: [mongoose.Schema.Types.ObjectId],
//     gender: String
// });

const User = mongoose.model('Vendor', userSchema)

export default User;