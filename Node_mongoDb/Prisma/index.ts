import express from "express"
import router from './route/index'
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);


var Port = process.env.PORT || 3030;

app.listen(Port, () => console.log(`Server runs on the port ${Port}. Env : ${process.env.PORT}`));
console.log("Test Alok");

