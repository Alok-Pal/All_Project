import customerRoute from './customerRoute';
import userRoute from './userRoute';
import express from 'express';

const route = express();

route.use('/api', userRoute)
route.use('/api', customerRoute)


export default route