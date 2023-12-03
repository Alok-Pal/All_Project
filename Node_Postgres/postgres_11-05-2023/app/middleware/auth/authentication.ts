import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'
import dotenv from "dotenv";


dotenv.config()

class Authentication {
    async authentication(req: any, res: Response, next: NextFunction) {
        try {
            const authHeader = req.headers["authorization"];
            console.log(req.body);

            const token = authHeader && authHeader.split(' ')[1];

            jwt.verify(token as string, process.env.APP_KEY as string, (err:any, user:any) => {
                if (err) {
                    res.status(401).json({
                        error: err
                    });
                }
                else {
                    req.Uid = user.id 
                    next()
                }
            })


        } catch {
            res.status(401).json({
                error: new Error('Invalid request!')
            });
        }
    }
}

export default new Authentication();
