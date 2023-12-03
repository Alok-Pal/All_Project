import express from "express"
import route from '../app/route'
import bodyParser from "body-parser";
import dotenv from "dotenv"
import cors from 'cors';


dotenv.config()

class Server {
    app: any
    port: any


    constructor() {
        this.app = express();
        this.port = process.env.PORT || 8000
    }

    start() {
        this.app.use(cors())
        console.log("aaa");

        console.log("env port ==>", process.env.PORT)
        console.log(process.env.PORT)
        this.config();
        this.setUp();
        this.listen();

    }

    config() {
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({ extended: false }))
    }

    setUp() {
        this.app.use(route)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`app is running on Port ${this.port}`);
        })
    }
}

export default Server