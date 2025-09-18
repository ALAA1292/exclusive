   
   
   export async function getProductDetails(productId:string){
        try {
            const res= await fetch(`https://ecommerce.routemisr.com/api/v1/products/${productId}`);

            if(!res.ok) throw new Error(res.statusText || "Failed to fetch product");
             
            const data= await res.json();
            return data;
            
        } catch (error) {
            console.log(error);
            return{error: error as string}
        }
    }
