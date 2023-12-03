import mongoose from "mongoose";
import dotenv from 'dotenv';




// dotenv.config()
// const dbURI = process.env.dbURI ;




// const dbURI = 'mongodb://127.0.0.1:27017/GroupOfOrganisation';

// Mongodb Atlas
const dbURI = "mongodb+srv://alokpal28797:ObXNPFI2NdnTUy7Q@alok.9c4lgm5.mongodb.net/AlokTest"


async function mongoDbData() {
    mongoose.connect(dbURI)
        .then(() => console.log('Connected to MongoDB'))
        .catch((err) => console.error('Error connecting to MongoDB', err));



}

export default mongoDbData;