import express from "express"
import routes from "../app/route/index"
import bodyParser from "body-parser"

class Server{
   app : any
   port : any
   
   constructor(){
    this.app = express()
    this.port = 8001;
   }

   start(){
    this.config();
    this.setupOutput()
    this.listen()
   }

   config(){
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({extended : false}))
   }

   setupOutput(){
    console.log("setup");
    this.app.use(routes)
   }

   listen(){
    this.app.listen(this.port ,() =>{
        console.log(`app is running on Port ${this.port}` );
    } )
   }
}


export default Server