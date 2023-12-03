import express from "express";
import  routers  from "./Route/index";
import bodyParser from "body-parser";
import dotenv from 'dotenv'

dotenv.config({path:".env"})

const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routers)

var Port = process.env.PORT || 8081;
app.listen(Port, () => console.log(`Server runs on the port ${Port}. Env : ${process.env.PORT}`));
console.log("Test Alok");