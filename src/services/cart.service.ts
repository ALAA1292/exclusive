"use server"
import { getUserToken } from "@/lib/server-utils";


export async function getCart() {

    try {

        const token = await getUserToken();

        const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
            headers: {
                token: token as string,
            }
        });

        if (!res.ok) throw new Error(res.statusText || "Failed to fetch cart");

        const data = await res.json();
        return data;

    } catch (error) {
        return { error: error as string }
    }
}


export async function addToCart(productId: string) {

    try {

        const token = await getUserToken();

        const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                token: token as string,
            },
            body: JSON.stringify({
                productId: productId,
            })
        });

        const data = await res.json();
        if (!res.ok) {
            return {
                data: null,
                success: false,
                message: data.message || "adding to cart failed"
            }
        }

        return {
            data: data,
            success: true,
            message: data.message || "added to cart successfully"
        }

    } catch (error) {
        return { error: error as string }
    }
}

// remove from cart function

export async function removeItemFromCart(productId: string) {

    try {

        const token = await getUserToken();

        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                token: token as string,
            },

        });

        const data = await res.json();
        if (!res.ok) {
            return {
                data: null,
                success: false,
                message: data.message || "removing from  cart failed"
            }
        }

        return {
            data: data,
            success: true,
            message: data.message || "removed from cart successfully"
        }

    } catch (error) {
        return { error: error as string }
    }
}



//clear cart function

export async function ClearCart() {

    try {

        const token = await getUserToken();
        console.log("tokeeeeeeeeeeeeeeeeeeeeen", token);

        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                token: token as string,
            },

        });

        const data = await res.json();
        console.log(data);
        if (!res.ok) {
            return {
                data: null,
                success: false,
                message: data.message || "removing all products from  cart failed"
            }
        }

        return {
            data: data,
            success: true,
            message: data.message || "cart cleared successfully"
        }

    } catch (error) {
        console.log(error);
        return { error: error as string }
    }
}

//updating cart product quantity
export async function UpdatingQuantity(productId: string, count: number) {

    try {

        const token = await getUserToken();
        console.log("tokeeeeeeeeeeeeeeeeeeeeen", token);

        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                token: token as string,
            },
            body: JSON.stringify({
                count: count,
            })
        });

        const data = await res.json();
        console.log(data);
        if (!res.ok) {
            return {
                data: null,
                success: false,
                message: data.message || "updating product quantity failed"
            }
        }

        return {
            data: data,
            success: true,
            message: data.message || "product quantity updated successfully"
        }

    } catch (error) {
        console.log(error);
        return { error: error as string }
    }
}
