export async function getAllOrders(userId: string) {

  

    try {


        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`, {
          method: "GET",
        });

        if (!res.ok) throw new Error(res.statusText || `Failed to fetch orders`);

        const data = await res.json();
        return data;

    } catch (error) {
        return { error: error as string }
    }
}