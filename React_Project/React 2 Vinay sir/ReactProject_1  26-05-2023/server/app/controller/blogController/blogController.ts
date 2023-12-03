import { Request, Response } from "express";
import blogRepo from "../../repo"
import { BlogModal } from "../../modal/blogModal/blogModal";
import { Responsemodal } from "../../modal/responseModal/responseModal";


let resposnseModal = new Responsemodal

class BlogController {

    // post request
    async postBlog(req: Request, res: Response) {
        console.log("running postBlog CONTROLLER");
        try {
            const blogData: BlogModal = {
                title: req.body.title,
                message: req.body.message,
                category: req.body.category,
            }
            console.log(blogData);
            const data = await blogRepo.blogRepo.postBlog(blogData)

            resposnseModal.data = data;
            resposnseModal.status = 200;
            resposnseModal.message = "Blog Posted Successfully";
            res.send(resposnseModal)

        } catch (error) {
            resposnseModal.status = 400;
            resposnseModal.message = error;
        }
    }


    // get blog post
    async getAllBlog(req: Request, res: Response) {
        console.log("running getBlog CONTROLLER");

        try {

            const data = await blogRepo.blogRepo.getAllBlogs();

            resposnseModal.data = data;
            resposnseModal.status = 200;
            resposnseModal.message = "Blog get Successfully";
            res.send(resposnseModal)
        } catch (error) {
            resposnseModal.status = 400;
            resposnseModal.error = error
        }

    }

    // get blog by id
    async getBlogBYId(req: Request, res: Response) {
        console.log("running getBlogBYId CONTROLLER");
        try {
            const id = req.params.id;
            const data = await blogRepo.blogRepo.getBlogById(id);
            resposnseModal.data = data;
            resposnseModal.status = 200;
            resposnseModal.message = "Blog get Successfully";
            res.send(resposnseModal)

        } catch (error) {
            resposnseModal.status = 400;
            resposnseModal.error = error
        }
    }


    // update blog post
    async updateBlog(req: Request, res: Response) {
        console.log("running updateBlog CONTROLLER");

        try {
            const updateBlogData: BlogModal = {
                title: req.body.title,
                message: req.body.message,
                category: req.body.category,
            }
            const updateId = req.params.id
            console.log("🚀 ~ file: blogController.ts:83 ~ BlogController ~ updateBlog ~ updateId:", updateId)

            const data = await blogRepo.blogRepo.updateBlog(updateId, updateBlogData)

            resposnseModal.data = data;
            resposnseModal.status = 200;
            resposnseModal.message = "Blog Updated Successfully";
            res.send(resposnseModal)


        } catch (error) {
            resposnseModal.status = 400;
            resposnseModal.error = error

        }
    }



    // delete blogF
    async deleteBlog(req: Request, res: Response) {
        console.log("running deleteBlog CONTROLLER");

        try {
            const deleteId = req.params.id;
            const data = await blogRepo.blogRepo.deleteBlog(deleteId);

            resposnseModal.data = data;
            resposnseModal.status = 200;
            resposnseModal.message = "Blog Deleted Successfully";
            res.send(resposnseModal)
        }
        catch (error) {
            resposnseModal.status = 400;
            resposnseModal.error = error
        }
    }

}

export default new BlogController();