import express from 'express'
import stockRoute from './StockRoute/stockRoute';
import orderRoute from './OrderRoute/OrderRoute';


const route = express(); 

route.use('/api', stockRoute)
route.use('/api', orderRoute)


export default route