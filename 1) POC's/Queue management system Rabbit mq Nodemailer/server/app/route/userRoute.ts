import express from 'express'
import UserController from '../controller/'

const userRoute = express()

userRoute.post( '/users/signup', UserController.UserController.signUp)

export default userRoute