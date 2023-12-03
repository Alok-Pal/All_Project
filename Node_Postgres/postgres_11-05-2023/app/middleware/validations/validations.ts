import { NextFunction } from "express"
import { Request, Response } from "express";
import { Responsemodal } from "../../modal/responseModal";



let responseModal = new Responsemodal
class UserAuth {

    emailPasswordCheck(req: Request, res: Response, next: NextFunction) {
        const emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.(com|co|in|org)$/
        const email = req.body.email;
        const passwordFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,12}$/
        const password = req.body.password;

        if (email === '' || !email.match(emailFormat)) {
            res.status(400).send({ message: 'Please enter a valid email.' });
        }
        else if (password === '' || !password.match(passwordFormat)) {
            res.status(400).send({ message: 'Please enter a valid password. Password should be 8 characters long at least one digit, one lowercase letter, one uppercase letter & no longer than 12 characters.' });
        }
        else {
            next();
        }
    }

}

export default new UserAuth()









