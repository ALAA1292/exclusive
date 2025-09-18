// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {

    interface User{
        user:{
            id: string;
            name:string;
            email:string;
            role:string;
            
        };
        token:string;
    }


  interface Session {
    user:User.user;
    userId:User.user.id;
  }
}