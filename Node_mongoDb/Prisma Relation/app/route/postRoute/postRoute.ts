import express from "express"
import postController from "../../controller/index"


const postRoute = express.Router()
postRoute.post("/post", postController.postController.postData)


export default postRoute