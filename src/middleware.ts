import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request });
    const { pathname } = request.nextUrl;
    const authRoutes = ["/login", "/register"];
    const protectedRoutes = ["/cart", "/checkout", "profile"];

    if (token && authRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL('/', request.url))

    }

    if (!token && protectedRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL('/login', request.url))

    }

}

export const config = {
    matcher: ['/cart', "/login", "/register","/checkout","/wishlist","/allorders"],
}