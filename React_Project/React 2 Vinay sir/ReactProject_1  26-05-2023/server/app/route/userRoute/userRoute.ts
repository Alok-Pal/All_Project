import express from 'express'
import userController from '../../controller'
import UserAuthentiction from '../../middleware/auth/auth'


const route = express()

route.post('/signup', userController.userController.userSignUp)
route.post('/login', userController.userController.userLogin)

route.put('/updateUser/:id', UserAuthentiction.authentication, userController.userController.userUpdate)
route.delete('/deleteUser/:id', UserAuthentiction.authentication, userController.userController.deleteUser)
route.get('/getUser/:id', UserAuthentiction.authentication, userController.userController.getUserById)
route.get('/getAllUser', UserAuthentiction.authentication, userController.userController.getAllUser)

route.post('/createRole', UserAuthentiction.authentication, userController.userController.createRole)
export default route