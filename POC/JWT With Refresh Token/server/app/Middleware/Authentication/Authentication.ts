import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'


dotenv.config()

class UserAuthorization {


    async userAuth(req: any, res: Response, next: NextFunction) {

        const accessToken = req.session.accessToken
        const RefreshToken = req.session.RefreshToken
        if (accessToken) {
            try {
                jwt.verify(accessToken as string, process.env.ACCESS_TOKEN_KEY as string, (err: any, user: any) => {
                    if (err) {

                        if (err.name == "TokenExpiredError") {

                            jwt.verify(RefreshToken, process.env.REFRESH_TOKEN_KEY as string, (err: any, user: any) => {
                                if (err) {
                                    res.status(401).send("")
                                }
                                else {
                                    const newUser = {
                                        email: user?.email,
                                        id: user?.id,
                                    }
                                    const accessToken = jwt.sign(newUser, process.env.ACCESS_TOKEN_KEY as string, { expiresIn: "10s" })
                                    req.session.accessToken = accessToken
                                    next()
                                }

                            })
                        }

                    }
                    else {
                        user
                        next()
                    }
                })
            } catch (error) {
                console.log(error, "trycatch");
            }
        }
        else {

            res.send("Invalid credentials")
        }


    }
}

export default new UserAuthorization()