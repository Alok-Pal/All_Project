import express from 'express'
import invoiceRouter from './route/index'
import bodyParser from 'body-parser';

const app = express()

app.use(invoiceRouter)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


var Port = process.env.PORT || 8081;
app.listen(Port, () => console.log(`Server runs on the port ${Port}. Env : ${process.env.PORT}`));
console.log("Test Alok");
