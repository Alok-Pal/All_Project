import express from "express"
import authroutes from "./authRoutes/UserRoutes"
import drugRoute from "./authRoutes/drugRoutes"
import alldataRoute from "../routes/authRoutes/getallDataRoutes"

const routes = express.Router()

routes.use('/user',authroutes)
routes.use('/drug',drugRoute)
routes.use('/getAllData',alldataRoute)

// routes.use

export default routes
