import express from 'express';
import formRoute from './formDataRoute/formDataRoute';

const route = express();

route.use('/api',formRoute)

export default route