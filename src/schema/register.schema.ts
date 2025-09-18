import * as z from "zod";

export const registerformSchema = z
  .object({
    name: z
      .string()
      .nonempty({ message: "name is required" })
      .min(3, "name must be 3 characters or more"),

    email: z
      .string()
      .email("Invalid email address."),

    password: z
      .string()
      .nonempty({ message: "password is required" })
      .min(8, "password must be 8 characters or more") 
.regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        "Must include A-Z, a-z, 0-9, symbol",
    }),
    rePassword: z
      .string()
      .nonempty({ message: "password is required" })
      .min(8, "password must be 8 characters or more")
      .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        "Must include A-Z, a-z, 0-9, symbol",
    }), 

    phone: z
      .string()
      .regex(/^(010|011|012|015)[0-9]{8}$/, {
        message: "Invalid Egyptian phone number",
      }),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "password and repassword must match",
    path: ["rePassword"], 
  });

export type RegisterSchema = z.infer<typeof registerformSchema>;


export const formState = {
  message: null,
  success: false,
  error: {},
};

export type formStateType={
    message: string|null,
  success: boolean,
  error: {
       name?: string[] | undefined,
        email?: string[] | undefined,
        password?: string[] | undefined,
        rePassword?: string[] | undefined,
        phone?: string[] | undefined
  },
}