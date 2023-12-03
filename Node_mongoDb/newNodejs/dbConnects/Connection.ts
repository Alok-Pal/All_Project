import mongoose from 'mongoose';
import  dotenv from 'dotenv' 
dotenv.config();

// var dbURI = process.env.dbURI || 'mongodb://127.0.0.1:27017/test';
const dbURI = 'mongodb://127.0.0.1:27017/AlokTest';

async function mongoDbData() {
    mongoose.connect(dbURI)
        .then(() => console.log('Connected to MongoDB'))
        .catch((err) => console.error('Error connecting to MongoDB', err));


    // const userSchema = new mongoose.Schema({
    //     // drug_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'test' }],
    //     Name: String,
    // });
    // const User = mongoose.model('test', userSchema);
    // const userData =await User.find({Name :"Alok"});

    // console.log(userData)
    // return userData

}
// mongoDbData().then((result) => {
//     data = result;
//     console.log(result)
// })

export default mongoDbData;