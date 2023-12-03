import { Request, Response } from "express-serve-static-core";
import imbdRepo from "../../repository/index";
import { ImdbModal } from "../../modal/imdbModal";



class ImbdController {
    async getData(req: Request, res: Response) {
        console.log("running")
        const data = await imbdRepo.imbdRepo.getImbdData()

        res.send(data)
    }

    async postData(req: Request, res: Response) {
        console.log("abdgahj")
        const imdbModal: ImdbModal = {
            genre: req.body.genre,
            ratings: req.body.ratings,
           
        }

        const data = await imbdRepo.imbdRepo.postImdbData(imdbModal)
        res.send(data)
    }
}

export default new ImbdController()