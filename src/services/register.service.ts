"use server"

import {formStateType, registerformSchema } from "@/schema/register.schema"

export async function handleRegister(formState: formStateType, values: FormData): Promise<formStateType> {
    const formValues = {
        name: values.get("name"),
        email: values.get("email"),
        password: values.get("password"),
        rePassword: values.get("rePassword"),
        phone: values.get("phone")
    }

    const parsedData = registerformSchema.safeParse(formValues)  //We validate the form data using Zod.

    //safeParse checks if the data matches the schema

    console.log("errors", parsedData.error?.flatten().fieldErrors)

    if (!parsedData.success) {
        return {
            success: false,
            error: parsedData.error?.flatten().fieldErrors,
            message: null
        }
    }

    try {
        const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signup",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formValues),
            }
        );
        const data = await res.json();
        console.log("register data",data);
        if (!res.ok) {
           return{
             success: false,
             error: {},
             message: data.message,
           }
        };
            return{
             success: true,
             error: {},
             message: data.message,
           };
    } catch (error) {
        console.log(error)
         return{
             success: false,
             error: {},
             message: (error as string || "something went wrong"),
           }
    }
}