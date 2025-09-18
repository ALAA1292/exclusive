"use client"
import React  from 'react'
import { Button } from '@/components/ui/button';
import { addToWishlist } from '@/services/wishlist.service';
import { toast } from 'sonner';
import { Heart, LoaderCircle } from "lucide-react";
import { useWishlist } from '@/context/WishlistContext';
import { useTransition } from 'react'
import { useSession } from "next-auth/react"
type WishlistbtnProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  productID: string;
};
export default function Wishlistbtn({ productID, ...props }: WishlistbtnProps ) {
  const { data: session } = useSession()

  const { getWishlistDetails } = useWishlist();
  const [isPending, startTransition] = useTransition();

  async function AddProductToWishlist(productID: string) {

    startTransition(async () => {
      const res = await addToWishlist(productID);
      console.log(res);


      if (res.success) {
        getWishlistDetails();   //to update wishlist details in context
        toast.success("Product added to wishlist successfully", { position: "top-right" });
      }
      else {
        if (!session) {
          toast.error("please login to add to wishlist: ", { position: "top-right" });

        }
        else {
          toast.error("Failed to add product to wishlist: ", { position: "top-right" });

        }
      }
    })

  }
  return (
    <div>
      <Button disabled={isPending}
        variant={"outline"} className="cursor-pointer"
        onClick={() => AddProductToWishlist(productID)} {...props}>
        {isPending ? <LoaderCircle className="animate-spin" /> : <Heart className="size-6 mx-auto text-gray-400" />}
      </Button>
    </div>
  )
}
