import * as z from "zod";

export const addressformSchema = z
    .object({
              cartid: z
            .string()
            .nonempty({ message: "address is required" }),
          
            details: z
            .string()
            .nonempty({ message: "address is required" })
            .min(3, "address must be 3 characters or more"),


        city: z
            .string()
            .nonempty({ message: "city is required" })
            .min(3, "city must be 3 characters or more"),


        phone: z
            .string()
            .regex(/^(010|011|012|015)[0-9]{8}$/, {
                message: "Invalid Egyptian phone number",
            }),
        
        paymentMethod: z
            .enum(["cash", "card"], {
                message: "payment method is required",
            }),
    })

export type addressFormType = z.infer<typeof addressformSchema>;


export const addressformState = {
    message: null,
    success: false,
    error: {
        cartid:[],
        details: [],
        city: [],
        phone: [],
        paymentMethod: [], 
    },
   callbackUrl:"",
};

export type addressformStateType = {
    message: string | null,
    success: boolean,
    error: {
        cartid?: string[] ,  
        details?: string[] ,
        city?: string[] ,
        phone?: string[] ,
        paymentMethod?: string[] ,
    },
     callbackUrl?:string,
}