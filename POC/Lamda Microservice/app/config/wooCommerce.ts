import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
//import WooCommerceAPI from "@woocommerce/woocommerce-rest-api";

//  WOOCOMMERCE CONFIGRATION
export const API = new WooCommerceRestApi({
  url: process.env.WOOCOMERCE_STORE_URL as string,
  consumerKey: process.env.CONSUMER_KEY as string,
  consumerSecret: process.env.CONSUMER_SECRET as string,
  version: "wc/v3", // API version (optional, defaults to 'wc/v3')
});