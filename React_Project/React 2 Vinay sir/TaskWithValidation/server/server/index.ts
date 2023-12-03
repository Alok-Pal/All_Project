import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import bodyParser from "body-parser"
import route from "../app/route"


dotenv.config()

class Server {

    port: any
    app: any

    constructor() {
        this.port = process.env.PORT || 8000
        this.app = express()
    }

    start() {
        this.app.use(cors())

        this.config()
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