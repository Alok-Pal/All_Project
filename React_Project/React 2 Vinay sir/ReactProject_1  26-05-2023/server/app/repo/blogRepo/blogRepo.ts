import { BlogModal } from './../../modal/blogModal/blogModal';
import prisma from '../../../prisma';


class BlogRepo {

    // post blogs
    async postBlog(blogModal: BlogModal) {
        console.log("running postBlog repo");
        return await prisma.blogs.create({
            data: {
                title: blogModal.title,
                message: blogModal.message,
                category: blogModal.category,
            }
        })

    }


    // Get all blog posts
    async getAllBlogs() {
        console.log("running getAllBlogs repo");
        return await prisma.blogs.findMany();
    }


    // Get blog posts by id
    async getBlogById(id: any) {
        console.log("running getBlogById repo");
        return await prisma.blogs.findMany({
            where: {
                id: id
            }
        })
    }


    // update blog posts

    async updateBlog(id: any, blogModal: BlogModal) {
        console.log("running updateBlog repo");
        return await prisma.blogs.update({
            where: {
                id: id
            },
            data: {
                title: blogModal.title,
                message: blogModal.message,
                category: blogModal.category,

            }
        })
    }

    async deleteBlog(id: any) {
        console.log("running deleteBlog repo");
        return await prisma.blogs.delete({
            where: {
                id: id
            }
        })
    }
}

export default new BlogRepo();