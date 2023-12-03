import { Request, Response } from "express";
import UserRepo from "../Repository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModal } from "../Model/userLoginModal";
import session from "express-session";

class UserController {
    async registerUser(req: Request, res: Response) {
        const data = {
            Name: req.body.Name,
            email: req.body.email,
            password: req.body.password,
        };

        try {
            data.password = await bcrypt.hash(data.password as string, 10);
            const response = await UserRepo.UserRepo.registerUser(data);
            console.log(
                "🚀 ~ file: Userlogin.ts:16 ~ UserController ~ registerUser ~ response:",
                response
            );

            res.status(200).send(response);
        } catch (error) {
            console.log(
                "🚀 ~ file: Userlogin.ts:20 ~ UserController ~ registerUser ~ error:",
                error
            );
            res.status(400).send(error);
        }
    }

    async loginuser(req: any, res: Response) {
        const data: UserModal = {
            email: req.body.email,
            password: req.body.password,
        };
        try {
            const response = await UserRepo.UserRepo.loginUser(data.email);
           

            if (!bcrypt.compare(data.password, response[0]?.password)) {
                res.status(400).send("please check ur credentials");
            } else {
                data.id = response[0].id;

                const accessToken = jwt.sign(
                    data,
                    process.env.ACCESS_TOKEN_KEY as string,
                    { expiresIn: "10s" }
                );
                const RefreshToken = jwt.sign(
                    data,
                    process.env.REFRESH_TOKEN_KEY as string,
                    { expiresIn: "24h" }
                );
              

                req.session.accessToken = accessToken;
                req.session.RefreshToken = RefreshToken;

                res.send({ accessToken: accessToken, RefreshToken: RefreshToken });
            }
        } catch (error) {
            res.send({ error: error });
            console.log(error);
        }
    }

    async getUser(req: Request, res: Response) {
        try {
            const response = await UserRepo.UserRepo.getUser();
           
            res.send(response);
        } catch (error) {
            res.send({ error });
            console.log(error);
        }
    }
}

export default new UserController();
