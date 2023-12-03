import express from "express";
import  router  from "./Route/index";   
import dotenv from 'dotenv';
import bodyParser from "body-parser";
dotenv.config();


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/',router.routers);

// app.use('/',router.invoiceRouters);

var Port = process.env.PORT || 2020;




app.listen(Port, () => console.log(`Server runs on the port ${Port}. Env : ${process.env.PORT}`));
console.log("Test Alok");

