"use client"
import { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { handlePayment } from "@/services/order.service"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { useActionState } from "react"
import { addressFormType, addressformSchema, addressformState } from "@/schema/address.schema"
import { useCart } from '@/context/CartContext';


export default function CheckoutPage() {
    const [action, formAction] = useActionState(handlePayment, addressformState)

    const form = useForm<addressFormType>({
        resolver: zodResolver(addressformSchema),
        defaultValues: { details: "", city: "", phone: "", cartid: "", paymentMethod: "cash" },
    })

    const {getCartDetails, setCartDetails, CartDetails } = useCart();


    const router = useRouter();

    useEffect(() => {
        if (CartDetails) {
            form.setValue("cartid", CartDetails.cartId);
        }
    }, [CartDetails,form])

    useEffect(() => {
        if (!action) return;

        if (action.success && action.message) {
            if (form.getValues("paymentMethod") === 'cash') {
                setCartDetails(null);
                getCartDetails()
                toast.success(action.message || "Payment successful!", { position: "top-center" });

                if (action.callbackUrl) {
                    router.push(action.callbackUrl || "/allorders");
                    getCartDetails()
                }

            }
            else {
                window.location.href = action.callbackUrl as string;

            }
        } else if (!action.success && action.error && action.message) {
            toast.error(action.message || "Payment failed. Please check the form.", { position: "top-center" });
        }
    }, [action,form]);




    return (
        <section className="max-w-2xl mx-auto pt-8 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-center mt-8">CheckOut</h1>
            <Form {...form}>
                <form action={formAction} className="space-y-8">
                    {/* cartid */}
                    <FormField
                        control={form.control}
                        name="cartid"
                        render={({ field }) => (
                            <FormItem hidden>
                                <FormControl>
                                    <Input hidden {...field} value={CartDetails?.cartId} />
                                </FormControl>

                            </FormItem>

                        )}
                    />
                    {/*name */}
                    <FormField
                        control={form.control}
                        name="details"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Address Details</FormLabel>
                                <FormControl>
                                    <Input placeholder="Address Details" {...field} />
                                </FormControl>
                                <FormMessage>{action?.error?.details?.[0]}</FormMessage>

                            </FormItem>

                        )}
                    />


                    {/*email */}

                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                    <Input placeholder="cairo" {...field} />
                                </FormControl>
                                <FormMessage>{action?.error?.city?.[0]}</FormMessage>

                            </FormItem>

                        )}
                    />

                    {/*phone */}

                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone</FormLabel>
                                <FormControl>
                                    <Input placeholder="**********" type="tel" {...field} />
                                </FormControl>
                                <FormMessage>{action?.error?.phone?.[0]}</FormMessage>

                            </FormItem>

                        )}
                    />

                    {/* payment method radio */}

                    <FormField
                        control={form.control}
                        name="paymentMethod"
                        render={({ field }) => (
                            <FormItem>
                                <RadioGroup onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    name={field.name}
                                >
                                    <div className="flex items-center gap-3">
                                        <RadioGroupItem value="cash" id="cash" />
                                        <Label htmlFor="cash">Cash</Label>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <RadioGroupItem value="card" id="card" />
                                        <Label htmlFor="card">Card</Label>
                                    </div>

                                </RadioGroup>
                                <FormMessage>{action?.error?.paymentMethod?.[0]}</FormMessage>

                            </FormItem>

                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </section>

    )
}