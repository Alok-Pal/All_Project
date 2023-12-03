import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import userRepo from '../../repo/userRepo/userRepo';

dotenv.config()

class UserAuthentiction {
    async authentication(req: any, res: Response, next: NextFunction) {

        try {
            const authHeaders = req.headers["authorization"];
            console.log("🚀 ~ file: auth.ts:10 ~ UserAuthentiction ~ authentication ~ authHeaders:", authHeaders)
            console.log(req.body);

            console.log("Going inaaaaaaaaaaaaaaaaa");
            const token = authHeaders && authHeaders.split(' ')[1];
            console.log("=>>>>>>>>>>>>>>>>>>>>>>>>>", token);


            jwt.verify(token as string, process.env.APP_KEY as string, async (err: any, user: any) => {
                console.log("andr hu+++++++++++++++++++++++");
                if (err) {
                    console.log(".................................................................");
                    console.log("🚀 ~ file: auth.ts:11 ~ UserAuthentiction ~ authentication ~ err:", err)
                    res.status(401).json({
                        error: err
                    })
                }
                else {
                    // sending id to controller
                    req.UId = user.id

                    // response we get from the data base to get the permisson
                    const permissionResponse = await userRepo.userGetPermissionById(user.id)

                    console.log("response +++++++++++++++++++++++++++++++===========================================++++++", permissionResponse);

                    req.object = permissionResponse

                    console.log("🚀 ~ file: auth.ts:26 ~ UserAuthentiction ~ jwt.verify ~ req:", req.UId)
                    next();
                }
            })

        } catch (error) {
            console.log(error);
            res.status(401).json({
                error: error
            });
        }
    }
}

export default new UserAuthentiction();