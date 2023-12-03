import express from "express";
import blogController from "../../controller";

const route = express();

route.post('/postBlog', blogController.blogController.postBlog)
route.get('/getBlog', blogController.blogController.getAllBlog)
route.get('/getBlog/:id', blogController.blogController.getBlogBYId)
route.put('/updateBlog/:id', blogController.blogController.updateBlog)
route.delete('/deleteBlog/:id', blogController.blogController.deleteBlog)

export default route;