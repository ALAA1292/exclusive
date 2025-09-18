"use client";
import { useEffect, useState } from "react";
import { getAllOrders } from "@/services/allorders.service";
import { IOrder } from "@/interfaces/order.interface";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import Image from "next/image";
import Loading from "./loading";
import { useTransition } from 'react'

export default function AllOrdersPage() {
    const [isPending, startTransition] = useTransition();
    const { data: session } = useSession();
    const [orders, setOrders] = useState<IOrder[]>([]);
    const userId = session?.userId;

    async function fetchOrders(userId: string) {
        startTransition(async () => {
            if (!userId) return;
            const res = await getAllOrders(userId);
            if (!res.error) {
                setOrders(res);

            } else {
                toast.error("something went wrong: ", { position: "top-right" });
            }
        })

    }

    useEffect(() => {
        fetchOrders(userId as string);
    }, [userId]);

    return (
        <section className="py-10 min-h-screen px-4">
            <div className="container mx-auto">
                <h2 className="text-2xl font-bold mb-6">My Orders</h2>
                {isPending && <Loading />}
                {orders.length==0 && (!isPending) &&
                    <p className="text-gray-500">No orders found.</p>
                }
                {orders &&
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {orders.map((order) => (
                            <div
                                key={order._id}
                                className="rounded-2xl shadow-md p-4 border bg-white"
                            >
                                <div className="mb-3">
                                    <p className="text-sm text-gray-600">
                                        <span className="font-semibold">Order ID:</span> {order._id}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-semibold">Date:</span>{" "}
                                       {order.createdAt.split("T")[0]}
                                    </p>
                                    <p className="text-sm">
                                        <span className="font-semibold">Payment:</span>{" "}
                                        {order.paymentMethodType}
                                    </p>
                                    <p className="text-sm">
                                        <span className="font-semibold">Total:</span> EGP
                                        {order.totalOrderPrice}
                                    </p>
                                    <p
                                        className={`text-sm font-semibold ${order.isDelivered ? "text-green-600" : "text-red-500"
                                            }`}
                                    >
                                        {order.isDelivered ? "Delivered" : "Not Delivered"}
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    {order.cartItems.map((item) => (
                                        <div
                                            key={item._id}
                                            className="flex items-center gap-3 border-t pt-2"
                                        >
                                            <Image
                                                src={item.product.imageCover}
                                                alt={item.product.title}
                                                width={60}
                                                height={60}
                                                className="rounded-lg object-cover"
                                            />
                                            <div>
                                                <h4 className="text-sm font-semibold">
                                                    {item.product.title}
                                                </h4>
                                                <p className="text-xs text-gray-600">
                                                    Qty: {item.count}
                                                </p>
                                                <p className="text-sm font-bold">EGP{item.price}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>}
            </div>
        </section>
    );
}
