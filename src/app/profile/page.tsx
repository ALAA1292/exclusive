"use client";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { toast } from "sonner"
import { changePassword } from "@/services/forgetpassword.service";
import { z } from "zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { signOut } from "next-auth/react";
import { useTransition } from 'react'
import { LoaderCircle } from 'lucide-react';

import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  currentPassword: z
    .string()
    .nonempty({ message: "Current password is required" }) 
    .min(6, { message: "Must be at least 6 characters" }),
  password: z
    .string()
    .nonempty({ message: "New password is required" })
    .min(6, { message: "Must be at least 6 characters" }),
  rePassword: z
    .string()
    .nonempty({ message: "Confirm password is required" })
    .min(6, { message: "Must be at least 6 characters" }),
}).refine((data) => data.password === data.rePassword, {
  message: "Passwords must match",
  path: ["rePassword"],
});

type LoginFormValues = z.infer<typeof formSchema>


export default function ProfilePage() {

    const { data: session, status } = useSession();
    const [isPending, startTransition] = useTransition();


    const form = useForm<LoginFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: { currentPassword: "", password: "", rePassword: "" }

    })

    async function onSubmit(values: LoginFormValues)
    {
        startTransition(() => {
             console.log(values)
             handleChangePassword(values.currentPassword, values.password, values.rePassword);
        });
       
    }

    if (status === "loading") {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="animate-pulse text-gray-500">Loading profile...</p>
            </div>
        );
    }

    if (!session) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-red-500 font-semibold">You are not logged in.</p>
            </div>
        );
    }

    async function handleChangePassword(currentpassword: string, password: string, rePassword: string) {
        const res = await changePassword(currentpassword, password, rePassword);
        if (res.success) {
         toast.success("Password changed successfully. You will be logged out.", {
            position: "top-center",
        });

        setTimeout(() => {
          signOut({ callbackUrl: "/login" }); 
        }, 1500);


        } else {
            toast.error(res.error, {
                position: "top-center",
            });
        }
    }

    return (
        <section className="py-12 min-h-screen px-4"
style={{
    backgroundImage: "url('/bg88.png')",
    backgroundSize: "800px auto",
    backgroundPosition: "right center",
   backgroundRepeat: "no-repeat",
  }}        >
            <div className="container mx-auto max-w-2xl">
                {/* Profile Info */}
                <div className="bg-white shadow rounded-2xl p-6 mb-8 border">
                    <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between border-b pb-2">
                            <span className="text-gray-600">Name:</span>
                            <span className="font-medium">{session.user?.name}</span>
                        </div>
                        <div className="flex justify-between  pb-2">
                            <span className="text-gray-600">Email:</span>
                            <span className="font-medium">{session.user?.email}</span>
                        </div>

                    </div>
                </div>

                {/* Change Password */}
                <div className="bg-white shadow rounded-2xl p-6 border">
                    <h3 className="text-xl font-semibold mb-4">Change Password</h3>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="currentPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>CurrentPassword</FormLabel>
                                        <FormControl>
                                            <Input placeholder="••••••••" type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>

                                )}
                            />
                            {/* password */}

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>New Password</FormLabel>
                                        <FormControl>
                                            <Input placeholder="••••••••" type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>

                                )}
                            />
                             <FormField
                                control={form.control}
                                name="rePassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <Input placeholder="••••••••" type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>

                                )}
                            />
                            <div className="flex gap-2">
                                       <Button  disabled={isPending}
                                       type="submit" className="me-5 bg-red-600 text-white hover:bg-red-900 cursor-pointer">
                                      {isPending? 
                                      <>  <LoaderCircle className="animate-spin w-4 h-4" />
                                       <span>Loading...</span></>:" Save Changes"}  
                                        </Button>
                            <Button  onClick={() => form.reset()} type="button" className="me-5 bg-white text-black hover:bg-white cursor-pointer">Cancel</Button>
                            </div>

                     


                           

                        </form>
                    </Form>
                </div>
            </div>
        </section>
    );
}
