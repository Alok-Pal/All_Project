import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

class UserAuthorization {

    async userAuth(req: any, res: Response, next: NextFunction) {

        const authHeaders = req.headers["authorization"];
        console.log("🚀 ~ file: auth.ts:12 ~ UserAuthorization ~ userAuth ~ authHeaders:", authHeaders)
        const token = authHeaders && authHeaders.split(" ")[1];
        console.log("🚀 ~ file: auth.ts:14 ~ UserAuthorization ~ userAuth ~ token:", token)


        jwt.verify(token as string, process.env.APP_KEY as string, (err: any, user: any) => {
            if (err) {
                console.log("🚀 ~ file: auth.ts:11 ~ UserAuthentiction ~ authentication ~ err:", err)
                res.status(401).json({
                    error: err
                })
            }
            else {
                req.UId = user.id
                console.log("🚀 ~ file: auth.ts:26 ~ UserAuthorization ~ jwt.verify ~ req.UId:", req.UId)

                next()
            }
        })
    }
}

export default new UserAuthorization()