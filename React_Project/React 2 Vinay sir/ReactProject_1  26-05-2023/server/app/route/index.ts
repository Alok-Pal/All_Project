import express from 'express'
import blogRoute from "./blogRoute/blogRoute";
import userRoute from './userRoute/userRoute'

const app = express();


app.use('/api', blogRoute);
app.use('/api', userRoute);
export default app;