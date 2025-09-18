"use server";

import { addressformStateType, addressformSchema } from "@/schema/address.schema";
import { getUserToken } from "@/lib/server-utils";


export async function handlePayment(formState: addressformStateType,
    formData: FormData): Promise<addressformStateType> {

    const shippingAddress = {
        details: formData.get("details"),
        city: formData.get("city"),
        cartid: formData.get("cartid"),
        phone: formData.get("phone"),
        paymentMethod: formData.get("paymentMethod"),
    }

    const parsedData = addressformSchema.safeParse(shippingAddress)  //We validate the form data using Zod.

    //safeParse checks if the data matches the schema


    if (!parsedData.success) {
        return {
            success: false,
            error: parsedData.error?.flatten().fieldErrors,
            message: null,
            callbackUrl: "/cart",
        }
    }


    try {
        let endPoint;
        if (shippingAddress.paymentMethod == "cash") {

            endPoint = shippingAddress.cartid;
        }
        else if (shippingAddress.paymentMethod == "card") {
            endPoint = `checkout-session/${shippingAddress.cartid}?url=${process.env.NEXTAUTH_URL}`;
        }

        const token = await getUserToken();

        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/${endPoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                token: token as string,
            },
            body: JSON.stringify({
                shippingAddress,
            })
        });

        const data = await res.json();
        if (!res.ok) {
            return {
                error: {},
                success: false,
                message: data.message || "Failed to place order",
                // paymentMethod: shippingAddress.paymentMethod,
            }
        }

        return {
            error: {},
            success: true,
            message: data.message || "order placed successfully",
            callbackUrl: shippingAddress.paymentMethod === "cash" ? "/allorders" : data.session?.url,
            // paymentMethod: shippingAddress.paymentMethod,
        }

    } catch (error) {
        return {
            error: {},
            success: false,
            message: (error as string) || "Failed to place order",
        }
    }


}