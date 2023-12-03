import express from "express";
import userRoute from "./userRoute/userRoute";
import supplierRoute from "./SupplierRoute/SupplierRoute";
import headersRoute from "./headersRoute/headersRoute";

const route = express();

route.use("/api",userRoute);
route.use("/api",supplierRoute)
route.use("/api",headersRoute)

export default route;
