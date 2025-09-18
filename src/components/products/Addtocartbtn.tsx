"use client"
import React, { useTransition } from 'react'
import { Button } from '@/components/ui/button';
import { addToCart } from '@/services/cart.service';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';
import { LoaderCircle } from 'lucide-react';
import { useSession } from "next-auth/react"
type AddtocartbtnProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  productID: string;
};
export default function Addtocartbtn({ productID, ...props }: AddtocartbtnProps ) {
    const { data: session } = useSession()
    const [isPending, startTransition] = useTransition();

    const { getCartDetails } = useCart();

    async function AddProductToCart(productID: string) {      //adding to cart function calling
        startTransition(async () => {
            const res = await addToCart(productID);

            if (res.success ) {
                getCartDetails();   //to update cart details in context
                toast.success("Product added to cart successfully", { position: "top-right" });
            }
            else {

                if (!session) {
                    toast.error("please login to add to cart: ", { position: "top-right" });
                }
else{
     toast.error("Failed to add product to cart: ", { position: "top-right" });

}
            }
        });

    }



    return (
        <div>
            <Button disabled={isPending}
            className='cursor-pointer'
                onClick={() => AddProductToCart(productID)} {...props}>
                {isPending ? <LoaderCircle className='animate-spin' /> : " Add to Cart"}
            </Button>
        </div>

    )
}
