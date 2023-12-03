import express from "express"
import route from '../app/Route'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from "body-parser"
dotenv.config()


class Server {
    port: any;
    app: any;

    constructor() {
        this.port = process.env.Port || 8080
        this.app = express()
        this.app.use(cors())
        
    }
    
    start() {
        this.config()
        this.setUp()
        this.listen()
    }

    config() {
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({ extended: false }))
        this.app.use('/uploads', express.static('uploads'))
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