import express from "express"
import route from "../app/route/index"
import bodyParser from "body-parser";

class Server {
    app: any
    port: any


    constructor() {
        this.app = express();
        this.port = 4041
    }

    start(){
        console.log("aaa");
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

export default  Server