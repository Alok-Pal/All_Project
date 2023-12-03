// import express from "express";
import { Request, Response } from "express";

class ProductController {
    getProduct(req: Request, res: Response) {
        console.log("Get Products");
        res.json({
            Name :'Alok pal'
        })
        // return "Get Products";
    }
    Save(req: Request, res: Response) {
        console.log("Save Products")
        console.log(req.body);

        return req.body;
    }
}

export default new ProductController();