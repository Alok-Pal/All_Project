import express from 'express'
import customerController from '../controller'

const customerRoute = express()

customerRoute.post('/postCustomer', customerController.customerController.postCustomer)

customerRoute.get('/getCustomer', customerController.customerController.getCustomer)


export default customerRoute