
import prisma from "./config/db";
import { API } from "./config/wooCommerce";

exports.handler = async (event: any) => {
    try {
        const response = await API.get("shipping_methods");
        console.log("Shipping Download:", response.data);

        for (const shippingData of response.data) {
            console.log(typeof (shippingData['_links']['self'][0]['href']), "12121")
            try {
                const shippingMethod = await prisma.shippingMethod.create({
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
                console.log("🚀 ~ file: handler.ts:47 ~ exports.handler= ~ shippingMethod:", shippingMethod)
            } catch (error) {
                console.error(error);
            }
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true }),
        };
    } catch (error) {
        console.log("Error while processing", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ success: false, error: "An error occurred." }),
        };
    }
};