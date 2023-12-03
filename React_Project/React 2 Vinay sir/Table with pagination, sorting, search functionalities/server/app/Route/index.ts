import express from 'express'
import productRoute from './ProductRoute/productRoute'


const route = express()

route.use('/api', productRoute)

export default route