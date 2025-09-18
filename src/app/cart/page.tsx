"use client"
import React from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';
import { useTransition } from 'react'

import { removeItemFromCart, ClearCart, UpdatingQuantity } from '@/services/cart.service';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { LoaderCircle } from 'lucide-react';
export default function CartPage() {
    const [isPending, startTransition] = useTransition();


    const { CartDetails, getCartDetails } = useCart();


    async function removeCartItem(productID: string) {

        const res = await removeItemFromCart(productID);
        if (res.success) {
            getCartDetails();
            toast.success("Product removed from cart successfully", { position: "top-right" });
        }
        else {
            toast.error("Product removed from cart failed", { position: "top-right" });

        }
    }
    async function removeAllCartItems() {
        startTransition(async () => {
            if(CartDetails?.numOfCartItems==0)
            {
            toast.error("your cart is already empty!", { position: "top-right" });
            return;
            }
            const res = await ClearCart();
            if (res.success) {

                getCartDetails();
                toast.success("all Products removed from cart successfully", { position: "top-right" });
            }
            else {
                toast.error("removing all cart products failed", { position: "top-right" });

            }
        })

    }

    async function editProQuantity(productID: string, count: number) {

        const res = await UpdatingQuantity(productID, count);
        if (res.success) {
            getCartDetails();
            toast.success("Quantity Updated successfully", { position: "top-right" });
        }
        else {
            toast.error("Failed To Update Quantity", { position: "top-right" });

        }
    }

    return (

        <section className='py-20 min-h-screen'>
            {CartDetails && <div className="container mx-auto">
                <Table className='mb-12'>
                    <TableHeader>
                        <TableRow>
                            <TableHead >Product</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead className="text-right">Subtotal</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {CartDetails.data.products?.map((product) =>
                        (<TableRow key={product._id}>
                            <TableCell className="font-medium relative py-5">
                                <Badge
                                    className="cursor-pointer  absolute -top-[0.2] left-0.5 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
                                    variant="destructive"
                                    onClick={() => { removeCartItem(product.product._id) }}
                                >
                                    X
                                </Badge>
                                <div className="flex items-center gap-5  ">
                                    <Image src={product.product.imageCover}
                                        alt={product.product.title} width={53} height={53}
                                    />

                                    <h2>  {product.product.title}</h2>

                                </div></TableCell>
                            <TableCell>{product.price}</TableCell>
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <Button onClick={() => { editProQuantity(product.product._id, product.count - 1) }} variant="outline" className="cursor-pointer">-</Button>
                                    {product.count}
                                    <Button onClick={() => { editProQuantity(product.product._id, product.count + 1) }} variant="outline" className="cursor-pointer" >+</Button>

                                </div>
                            </TableCell>
                            <TableCell className="text-right">{(product.price) * (product.count)}</TableCell>
                        </TableRow>
                        ))}

                    </TableBody>
                </Table>
                <div className="flex justify-between mb-6">
                    <Button variant="outline" >
                        <Link href={"/products"}>Return To Shop</Link>

                    </Button>
                    <Button onClick={() => { removeAllCartItems() }} variant="destructive" >
          {isPending ?<><LoaderCircle className="animate-spin" />Removing...</> :"Remove All"} 

                    </Button>
                </div>
                <section className='flex justify-between'>
                    <div className="flex items-center gap-4 w-5/12">
                        <Input placeholder='Coupon Code' className='rounded-none rounded-l-md' />
                        <Button variant="destructive" >
                            Apply Coupon

                        </Button>
                    </div>


                    <div className="w-5/12 py-8 px-6 border border-gray-950">
                        <h3 className="font-bold mb-6 text-xl">Cart Total</h3>
                        <ul className="divide-y divide-gray-300">
                            <li className="flex justify-between py-6">
                                <span>Subtotal</span>
                                <span>100 EGP</span>
                            </li>
                            <li className="flex justify-between py-6">
                                <span>Shipping</span>
                                <span>FREE</span>
                            </li>
                            <li className="flex justify-between py-6">
                                <span>Total:</span>
                                <span>100 EGP</span>
                            </li>
                        </ul>
                        <div className="flex justify-center ">
                            <Button variant="destructive" >
                                <Link href={"/checkout"}>
                                    Proceed To Checkout
                                </Link>


                            </Button>
                        </div>

                        
                    </div>

                </section>

            </div>}


        </section>
    )
}
