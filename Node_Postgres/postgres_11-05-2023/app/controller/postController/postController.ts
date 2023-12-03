import { Request, Response } from "express"
import { PostModal } from "../../modal/postModal/postModal"
import postRepo from "../../repo"
import { Responsemodal } from "../../modal/responseModal"
import { CategoryModal } from "../../modal/categoryModal/categoryModal"

let responseModal = new Responsemodal
class PostsController {
    async savePostsData(req: Request, res: Response) {
        console.log("possss");
        // id from token
        try {
            const postModal: PostModal = {
                title: req.body.title,
                content: req.body.content,
                published: req.body.published,
                userId: (req as any).Uid

            }
            const categoryModal: CategoryModal = {
                category: req.body.category
            }
            console.log(postModal);
            const data = await postRepo.postRepo.savePosts(postModal, categoryModal)
            console.log(data);
            // Response to user
            responseModal.message = "Data posted Successsfully"
            responseModal.status = 200
            responseModal.data = data
            responseModal.error = null
            res.send(responseModal)
        } catch (error) {
            responseModal.status = 400
            responseModal.message = "Data not posted"
            responseModal.data = null
            responseModal.error = error
            res.send(responseModal)
            console.log(error)
        }
    }

    async getPosts(req: Request, res: Response) {
        console.log("get runninng");
        const Uid = (req as any).Uid
        console.log("Uid........", Uid);

        try {
            const data = await postRepo.postRepo.getPosts(Uid)
            console.log(data)

            responseModal.message = "Data get Successsfully"
            responseModal.status = 200
            responseModal.data = data
            responseModal.error = null
            res.send(responseModal)
        } catch (error) {
            responseModal.status = 400
            responseModal.message = "Data not found"
            responseModal.data = null
            responseModal.error = error
            res.send(responseModal)
            console.log(error)
        }

        console.log(req.query.id);
    }

    async updatePost(req: Request, res: Response) {
        console.log("updatePost runninng");

        try {
            const postModal: PostModal = {
                title: req.body.title,
                content: req.body.content,
                published: req.body.published,
                userId: (req as any).Uid

            }
            const categoryModal: CategoryModal = {
                category: req.body.category
            }

            const UserPostId = parseInt(req.params.id)

            const data = await postRepo.postRepo.updatePost(UserPostId, postModal, categoryModal)


            responseModal.message = "Data updated Successsfully"
            responseModal.status = 200
            responseModal.data = data
            responseModal.error = null
            res.send(responseModal)

        } catch (error) {
            responseModal.status = 400
            responseModal.message = "Data not updated"
            responseModal.data = null
            responseModal.error = error
            res.send(responseModal)
            console.log(error)
        }

    }

    async deletePost(req: Request, res: Response) {

        try {

            const deleteId = req.params.id

            const data = await postRepo.postRepo.deletePost(parseInt(deleteId))
            responseModal.message = "Data deleted Successsfully"
            responseModal.status = 200
            responseModal.data = data
            responseModal.error = null
            res.send(responseModal)
        } catch (error) {
            responseModal.status = 400
            responseModal.message = "Data is not deleted"
            responseModal.data = null
            responseModal.error = error
            res.send(responseModal)
            console.log(error)
        }
    }



    async getSearching(req: Request, res: Response) {
        try {
            console.log("search");
            const itemToSearch = (req.query.search)
            console.log("search",itemToSearch as unknown)
            const data = await postRepo.postRepo.searchingPosts(itemToSearch)
            responseModal.message = "Data searched Successsfully"
            responseModal.status = 200
            responseModal.data = data;
            responseModal.error = null
            res.send(responseModal)


        } catch (error) {
            responseModal.status = 400
            responseModal.message = "Data is not searched"
            responseModal.data = null
            responseModal.error = error
            res.send(responseModal)
            console.log(error)
        }
    }

    async filterPost(req: Request, res: Response) {
        try {
            // const itemToSearch = (req.query.filter)
            
            const itemToSearch= (req.query.filter) as any;
            // const searchBoolean: boolean = itemToSearch;
            console.log("sdes",typeof(itemToSearch))
            // console.log(searchBoolean)

            let searchItem:boolean;
            if(itemToSearch=='true'){
                searchItem=true
            }
            else{
                searchItem=false
            }

            console.log(searchItem);

            const data = await postRepo.postRepo.filterPosts((searchItem) )
            responseModal.message = "Data filtered Successsfully"
            responseModal.status = 200
            responseModal.data = data;
            responseModal.error = null
            res.send(responseModal)
        } catch (error) {
            responseModal.status = 400
            responseModal.message = "Data is not filtered"
            responseModal.data = null
            responseModal.error = error
            res.send(responseModal)
            console.log(error)
        }
    }



    async sortPosts(req:Request,res:Response){
        try {
            
            const itemToSort = req.query.sort;
            console.log(itemToSort);

            const Uid = (req as any).Uid

            const data = await postRepo.postRepo.sortPosts(itemToSort,Uid)
            responseModal.message = "Data sorted Successsfully"
            responseModal.status = 200
            responseModal.data = data;
            responseModal.error = null
            res.send(responseModal)
            console.log(data);
        } catch (error) {
            responseModal.status = 400
            responseModal.message = "Data is not sorted"
            responseModal.data = null
            responseModal.error = error
            res.send(responseModal)
            console.log(error)
        }
    }
}
export default new PostsController()