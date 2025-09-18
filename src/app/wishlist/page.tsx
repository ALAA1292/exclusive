"use client"
import React from 'react'
import { useWishlist } from '@/context/WishlistContext';
import { removeItemFromWishlist } from '@/services/wishlist.service';
import { toast } from 'sonner';
import {  Trash2 } from 'lucide-react'
import ProductItem from "@/components/products/ProductItem"
export default function WishlistPage() {


    const { WishlistDetails, getWishlistDetails } = useWishlist();

    //remove wishlist item
    async function removeWishlistItem(productID: string) {

        const res = await removeItemFromWishlist(productID);
        console.log(res)
        if (res.success) {
            getWishlistDetails();
            toast.success("Product removed from Wishlist successfully", { position: "top-right" });
        }
        else {
            toast.error("Product removed from Wishlist failed", { position: "top-right" });

        }
    }

    return (
        <div>
            <section className="py-10 min-h-screen px-4">
                <div className="container mx-auto">
            {WishlistDetails && <h2 className='mb-8'>wishlist({WishlistDetails?.count})</h2>}

                    {WishlistDetails?.count == 0 &&<><h2 className="text-2xl font-bold mb-4">Your Wishlist is Empty</h2>
                     <p className="mb-8">Looks like you have not added any items to your Wishlist yet.</p></>}
                     
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-15">

                        {WishlistDetails?.data?.map((item) => (<div className='relative ' key={item.id}>
                            <Trash2 onClick={() => { removeWishlistItem(item.id) }} size={20} className="text-gray-700 absolute top-1 right-10 z-50 cursor-pointer" />
                            <ProductItem product={item} isWishlistPage />
                        </div>

                        ))}

                    </div>
        
                </div>
            </section>
        </div>
    );

}
