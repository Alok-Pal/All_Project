import express from "express"
import commentsController from "../../controller"

const commentsRoute = express.Router()
commentsRoute.get("/getComments", commentsController.commentsController.getCommentsData)
commentsRoute.post("/postComments",commentsController.commentsController.postCommentsData)
commentsRoute.put("/updateComments/:id",commentsController.commentsController.updateCommentsData)
commentsRoute.delete("/deleteComments/:id",commentsController.commentsController.deleteCommentsData)
commentsRoute.get("/searchingComments", commentsController.commentsController.getSearching)



export default commentsRoute