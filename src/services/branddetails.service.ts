   export async function getBrandDetails(brandId: string){
        try {
            const res= await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${brandId}`);

            if(!res.ok) throw new Error(res.statusText || "Failed to fetch brand");
             
            const data= await res.json();
            return data;
            
        } catch (error) {
            return{error: error as string}
        }
    }
