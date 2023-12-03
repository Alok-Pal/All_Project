"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("./config/db"));
const wooCommerce_1 = require("./config/wooCommerce");
exports.handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield wooCommerce_1.API.get("shipping_methods");
        console.log("Shipping Download:", response.data);
        const createdCustomers = [];
        // for (const customerData of response.data) {
        //   const createdCustomer = await prisma.customer.create({
        //     data: {
        //       id: customerData.id,
        //       date_created: new Date(customerData.date_created),
        //       date_created_gmt: new Date(customerData.date_created_gmt),
        //       date_modified: new Date(customerData.date_modified),
        //       date_modified_gmt: new Date(customerData.date_modified_gmt),
        //       email: customerData.email,
        //       first_name: customerData.first_name,
        //       last_name: customerData.last_name,
        //       role: customerData.role,
        //       username: customerData.username,
        //       is_paying_customer: customerData.is_paying_customer,
        //       avatar_url: customerData.avatar_url,
        //       meta_data: customerData.meta_data,
        //     },
        //   });
        //   createdCustomers.push(createdCustomer);
        // }
        // console.log("Created Customers:", createdCustomers);
        for (const shippingData of response.data) {
            console.log(typeof (shippingData['_links']['self'][0].href), "12121");
            try {
                const shippingMethod = yield db_1.default.shippingMethod.create({
                    data: {
                        id: shippingData.id,
                        title: shippingData.title,
                        description: shippingData.description,
                        links: {
                            create: {
                                self: [shippingData['_links']['self'][0].href],
                                collection: [shippingData['_links']['collection'][0].href]
                            },
                        }
                    },
                });
                console.log("🚀 ~ file: handler.ts:47 ~ exports.handler= ~ shippingMethod:", shippingMethod);
                // res.json(shippingMethod);
            }
            catch (error) {
                console.error(error);
                // res.status(500).json({ error: 'An error occurred' });
            }
        }
        return {
            statusCode: 200,
            body: JSON.stringify({ success: true }),
        };
    }
    catch (error) {
        console.log("Error while processing", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ success: false, error: "An error occurred." }),
        };
    }
});
