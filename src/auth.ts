import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {

    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "username@domain.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                try {
                    const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin",
                        {
                            method: "post",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                email: credentials?.email,
                                password: credentials?.password
                            })
                        }
                    );
                    const data = await res.json();
                    if (!res.ok) {
                        throw new Error(data.message || "Invalid credentials");
                    }
                    const decoded = JSON.parse(atob(data.token.split(".")[1]))
                    console.log("useridddddddddddddddddddddddddd", decoded.id);
                    console.log("userrrrrrrrrrrrrrrrrrrrrr", data.user);

                    return {
                        id: decoded.id,
                        user: data.user,
                        token: data.token
                    };
                } catch (error) {
                    console.log(error);
                    throw new Error((error as Error).message);
                }
            }
        })
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = user.user;
                token.token = user.token;
                token.userId = user.id;
            }
            return token
        },
        async session({ session, token }) {
            if (token) {
                session.user = token.user;
                session.userId = token.userId
            }
            return session
        },
    },

    pages: {
        signIn: '/login'
    }

}








// import { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";

// export const authOptions: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email", placeholder: "username@domain.com" },
//         password: { label: "Password", type: "password" }
//       },
//       async authorize(credentials) {
//         try {
//           const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//               email: credentials?.email,
//               password: credentials?.password
//             })
//           });

//           const data = await res.json();

//           if (!res.ok) {
//             throw new Error(data.message || "Invalid credentials");
//           }

//           // نفك الـ token عشان نجيب الـ id
//           const decoded = JSON.parse(atob(data.token.split(".")[1]));

//           return {
//             id: decoded.id,
//             ...data.user, // نحط باقي بيانات اليوزر زي name, email, role...
//           };
//         } catch (error) {
//           console.log(error);
//           throw new Error((error as Error).message);
//         }
//       }
//     })
//   ],

//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.user = user;   // نخزن بيانات اليوزر
//         token.userId = user.id; // نخزن الـ id
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (token) {
//         session.user = token.user as any; // بيرجع كل بيانات اليوزر
//         session.userId = token.userId as string; // بيرجع الـ id
//       }
//       return session;
//     }
//   },

//   pages: {
//     signIn: "/login"
//   }
// };
