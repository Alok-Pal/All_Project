import express from 'express';
import UserController from '../Controller';
import UserAuthorization from "../Middleware/Authentication/Authentication"

const userRoute = express()

userRoute.post('/register', UserController.UserController.registerUser)

userRoute.post('/login', UserController.UserController.loginuser)

userRoute.get('/getUser', UserAuthorization.userAuth, UserController.UserController.getUser)




export default userRoute