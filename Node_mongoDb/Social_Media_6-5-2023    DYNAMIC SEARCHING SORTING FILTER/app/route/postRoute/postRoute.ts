import express from "express"
import postsController from "../../controller"

const postRouter = express.Router()
postRouter.get("/getPosts",postsController.postController.getPostsData)
postRouter.post("/postPosts",postsController.postController.postPostsData)
postRouter.put("/updatePosts/:id",postsController.postController.updataPostsData)
postRouter.delete("/deletePosts/:id",postsController.postController.deletePostsData)
postRouter.get("/getSearching",postsController.postController.getSearching)




export default postRouter