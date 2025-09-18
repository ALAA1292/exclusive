   export async function getCategoryDetails(categoryId: string){
        try {
            const res= await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}`);

            if(!res.ok) throw new Error(res.statusText || "Failed to fetch category");
             
            const data= await res.json();
            return data;
            
        } catch (error) {
            return{error: error as string}
        }
    }
