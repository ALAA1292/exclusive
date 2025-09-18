"use client"
import { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { formState, registerformSchema, RegisterSchema } from "@/schema/register.schema"

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
import { handleRegister } from "@/services/register.service"
import { useActionState } from "react"


export default function RegisterPage() {


  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerformSchema),
    defaultValues: { name: "", email: "", password: "", rePassword: "", phone: "" }
  })

  const [action, formaction] = useActionState(handleRegister, formState)

  const router = useRouter();

  useEffect(() => {
    if (action) {
      if (!action.success && action.message) {
        toast.error(action.message, { position: "top-center" })
      }
      if (action.success && action.message) {
        toast.success(action.message, { position: "top-center" })
        router.push("/login")

      }
    }
  }, [action,router])

  return (
    <section className="py-12" style={{
      backgroundImage: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('bg4.svg')",
      backgroundSize: "500px auto",
      backgroundPosition: "right center",
      backgroundRepeat: "repeat",
    }}>
      <section className="max-w-2xl mx-auto pt-8 bg-white rounded-3xl min-h-screen shadow-lg border-2 p-8"
      >
        <Form {...form}>
          <form action={formaction} className="space-y-8">
            {/*name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="user name" {...field} />
                  </FormControl>
                  <FormMessage>{action.error?.name?.[0]}</FormMessage>

                </FormItem>

              )}
            />


            {/*email */}

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="username@domain.com" {...field} />
                  </FormControl>
                  <FormMessage>{action.error?.email?.[0]}</FormMessage>

                </FormItem>

              )}
            />
            {/* password */}

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="••••••••" type="password" {...field} />
                  </FormControl>
                  <FormMessage>{action.error?.password?.[0]}</FormMessage>

                </FormItem>

              )}
            />

            {/*re-password */}

            <FormField
              control={form.control}
              name="rePassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input placeholder="••••••••" type="password" {...field} />
                  </FormControl>
                  <FormMessage>{action.error?.rePassword?.[0]}</FormMessage>
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
                  <FormMessage>{action.error?.phone?.[0]}</FormMessage>

                </FormItem>

              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </section>
    </section>


  )
}