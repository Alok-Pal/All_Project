import imbdRoute from "./imbdRoute/imbdRoute";
import express  from "express";

const Route = express.Router();
Route.use("/get",imbdRoute)

export default Route
 