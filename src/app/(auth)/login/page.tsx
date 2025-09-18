"use client"
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { signIn } from 'next-auth/react'
import { forgetPassword, verifyResetCode, resetPassword } from "@/services/forgetpassword.service"
import { Button } from "@/components/ui/button"
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
import { useState, useTransition } from "react"
import { LoaderCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

const formSchema = z.object({
  email: z.email({
    message: "Invalid email address.",
  }),
  password: z.string().nonempty({ message: "Password is required" })
})

type LoginFormValues = z.infer<typeof formSchema>

export default function LoginPage() {
  const [resetCode, setResetCode] = useState(false)
  const [resetCodeValue, setResetCodeValue] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [resetPass, setResetPass] = useState(false)
  const [email, setEmail] = useState("")
  const [isPending, startTransition] = useTransition()
 const { getCartDetails } = useCart();
  const { getWishlistDetails } = useWishlist();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" }
  })

  const router = useRouter()

  async function onSubmit(values: LoginFormValues) {
    startTransition(async () => {
      try {
        const res = await signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: false,
          callbackUrl: "/",
        })
        if (res?.ok) {
          toast.success("You logged in successfully", {
            position: "top-center",
          })
          router.push("/")
          getCartDetails();
          getWishlistDetails();

        } else {
          toast.error(res?.error || "Something went wrong", {
            position: "top-center",
          })
        }
      } catch (error) {
      }
    })
  }

  async function handleForgotPassword() {
    const email = form.getValues("email")
    setEmail(email)
    const res = await forgetPassword(email)
    if (res.success) {
      setResetCode(true)
      toast.success("Password reset email sent.", { position: "top-center" })
    } else {
      toast.error(res.error, { position: "top-center" })
    }
  }

  async function handleVerifyResetCode(resetCode: string) {
    const res = await verifyResetCode(resetCode)
    if (res.success) {
      setResetCode(false)
      setResetPass(true)
      toast.success("Reset code verified successfully.", { position: "top-center" })
    } else {
      toast.error(res.error, { position: "top-center" })
    }
  }

  async function handleResetPassword(email: string, newPassword: string) {
    const res = await resetPassword(email, newPassword)
    if (res.success) {
      setResetPass(false)
      setNewPassword("")
      toast.success("Password reset successfully", { position: "top-center" })
    } else {
      toast.error(res.error, { position: "top-center" })
    }
  }

  return (
<section 
style={{
    backgroundImage: "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.4)), url('bg4.svg')",
    backgroundSize: "500px auto",
    backgroundPosition: "right center",
    backgroundRepeat: "repeat",

  }}>
      <section className="max-w-md mx-auto pt-16 h-screen flex items-start">
      <Card className="w-full shadow-xl  border-2 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold">
            login To Enclusive
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="username@domain.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="••••••••" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Actions */}
              <div className="flex gap-3 justify-between">
                <Button disabled={isPending} type="submit" className="flex-1">
                  {isPending ? (
                    <>
                      <LoaderCircle className="animate-spin mr-2 h-4 w-4" />
                      Loading...
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={handleForgotPassword}
                >
                  Forgot Password?
                </Button>
              </div>

              {/* Reset Code Step */}
              {resetCode && (
                <div className="space-y-3 border-t pt-4">
                  <p className="text-sm text-red-700">
                    Enter the reset code sent to your email
                  </p>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter reset code"
                      value={resetCodeValue}
                      onChange={(e) => setResetCodeValue(e.target.value)}
                    />
                    <Button
                      onClick={() => handleVerifyResetCode(resetCodeValue)}
                      disabled={!resetCodeValue}
                    >
                      Verify
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setResetCodeValue("")
                        setResetCode(false)
                      }}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              )}

              {/* Reset Password Step */}
              {resetPass && (
                <div className="space-y-3 border-t pt-4">
                  <p className="text-sm text-red-700">
                    Enter your new password
                  </p>
                  <div className="flex gap-2">
                    <Input
                      type="password"
                      placeholder="New password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <Button
                      onClick={() => handleResetPassword(email, newPassword)}
                      disabled={!newPassword}
                    >
                      Reset
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setResetPass(false)
                        setNewPassword("")
                      }}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
</section>

  )
}
