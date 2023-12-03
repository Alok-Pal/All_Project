import mongoose from 'mongoose';
import userSchema from './Schema';
import dotenv from 'dotenv';
// const dbURI = 'mongodb://127.0.0.1:27017/Drug_Management_System';
var dbURI = process.env.dbURI || 'mongodb://127.0.0.1:27017/Drug_Management_System';
dotenv.config();
async function mongoDbData() {
    mongoose.connect(dbURI)
        .then(() => console.log('Connected to MongoDB'))
        .catch((err) => console.error('Error connecting to MongoDB', err));




    //  return userData
    // console.log(userData)

}
// mongoDbData().then((result) => {
//     console.log(result)
// })

export default mongoDbData;