"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.API = void 0;
const woocommerce_rest_api_1 = __importDefault(require("@woocommerce/woocommerce-rest-api"));
//import WooCommerceAPI from "@woocommerce/woocommerce-rest-api";
//  WOOCOMMERCE CONFIGRATION
exports.API = new woocommerce_rest_api_1.default({
    url: process.env.WOOCOMERCE_STORE_URL,
    consumerKey: process.env.CONSUMER_KEY,
    consumerSecret: process.env.CONSUMER_SECRET,
    version: "wc/v3", // API version (optional, defaults to 'wc/v3')
});
