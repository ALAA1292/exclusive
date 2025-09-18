import { getUserToken } from "@/lib/server-utils";


// forget password service

export async function forgetPassword(email: string) {
  try {
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",

        },
        body: JSON.stringify({ email }),
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData?.message || "Something went wrong!");
    }

    const data = await res.json();
    return {
      success: true,
      data,
    };
  } catch (error: unknown) {
  return {
    success: false,
    error: error instanceof Error ? error.message : String(error) || "Unexpected error",
  };
}

}
////verify reset code


export async function verifyResetCode(resetCode: string) {
  try {
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ resetCode }),
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData?.message || "Something went wrong!");
    }

    const data = await res.json();
    return {
      success: true,
      data,
    };
  } catch (error: unknown) {
  const message =
    error instanceof Error ? error.message : "Unexpected error";

  return {
    success: false,
    error: message,
  };
}

}

//////reset password

export async function resetPassword(email: string, newPassword: string) {
  try {
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, newPassword }),
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData?.message || "Something went wrong!");
    }

    const data = await res.json();
    return {
      success: true,
      data,
    };
  } catch (error: unknown) {
  return {
    success: false,
    error: error instanceof Error ? error.message : "Unexpected error",
  };
}

}

//change logged in user password

export async function changePassword(currentPassword: string, password: string, rePassword: string) {


  try {

    const token = await getUserToken();
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: token as string,
        },
        body: JSON.stringify({ password, rePassword, currentPassword }),
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData?.message || "Something went wrong!");
    }

    const data = await res.json();
    return {
      success: true,
      data,
    };
  } catch (error: unknown) {
  let message: string;

  if (error instanceof Error) {
    message = error.message;
  } else {
    message = "Unexpected error";
  }

  return {
    success: false,
    error: message,
  };
}

}
