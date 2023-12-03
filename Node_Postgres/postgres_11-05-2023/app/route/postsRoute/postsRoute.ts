import express from "express"
import postController from "../../controller"
import auth from "../../middleware/auth/authentication"

const postRouter = express.Router()
postRouter.get("/getPosts",auth.authentication , postController.postController.getPosts)
postRouter.post("/savePosts", auth.authentication,postController.postController.savePostsData)
postRouter.put("/updatePosts/:id", auth.authentication, postController.postController.updatePost)
postRouter.delete("/deletPosts/:id",auth.authentication,postController.postController.deletePost)

postRouter.get("/searchPosts", postController.postController.getSearching)
postRouter.get("/filterPosts", postController.postController.filterPost)
postRouter.get("/sortPosts",auth.authentication, postController.postController.sortPosts)

export default postRouter
