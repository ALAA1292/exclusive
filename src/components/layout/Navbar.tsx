"use client";
import { LoaderCircle, LogOut, ShoppingBag } from 'lucide-react';
import { useSession } from "next-auth/react"
import { MenuIcon, Heart, ShoppingCart, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button";
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    path: "/",
    label: "Home"
  },
  {
    path: "/products",
    label: "Products"
  },
  {
    path: "/categories",
    label: "Categories"
  },
  {
    path: "/brands",
    label: "Brands"
  }

]

const Navbar = () => {

  const { CartDetails } = useCart();
  const { WishlistDetails } = useWishlist();


  const pathname = usePathname()
  const { data: session, status } = useSession()
  return (
    <section className="py-4 shadow-md  px-4 ">
      <div className="container mx-auto">
        <nav className="flex items-center justify-between  pt-4  ">
          <Link
            href="/"
            className="flex items-center gap-2"
          >

            <ShoppingCart className="size-8" />
            <span className="text-2xl font-semibold tracking-tighter">
              Exclusive
            </span>
          </Link>
          <NavigationMenu className="hidden lg:block">
            <NavigationMenuList>
              {
                links.map((link, index) => (
                  <NavigationMenuItem key={index}>
                    <NavigationMenuLink
                      href={link.path}
                      className={cn(navigationMenuTriggerStyle(), pathname === link.path && "underline")}
                    >
                      {link.label}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))
              }

            </NavigationMenuList>
          </NavigationMenu>
          <div className="hidden items-center gap-4 lg:flex">
            {status === "loading" ? (
              <><LoaderCircle className="animate-spin size-6" />
              </>
            ) : status === "unauthenticated" ? (
              <>
                <Button asChild variant="outline">
                  <Link href="/login">Sign in</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Sign Up</Link>
                </Button>
              </>
            ) : (
              <>
                <div className="flex items-center gap-4">
                  <Link className="relative" href="/wishlist">
                    <Badge
                      className="bg-red-500 absolute -top-1/4 -end-1/2 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"

                    >
                      {WishlistDetails?.count}
                    </Badge>
                    <Heart className="size-7" />
                  </Link>

                  <Link className="relative" href="/cart">
                    <Badge
                      className="bg-red-500 absolute -top-1/4 -end-1/2 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"

                    >
                      {CartDetails?.numOfCartItems}
                    </Badge>
                    <ShoppingCart className="size-7" />
                  </Link>

                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <User className="size-8 cursor-pointer " />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel className="text-red-500 font-light text-md"> {session?.user.name}
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <User /><Link href="/profile">Manage My Acoount</Link></DropdownMenuItem>
                      <DropdownMenuItem>
                        <ShoppingBag /><Link href="/allorders">My Orders</Link></DropdownMenuItem>
                      <DropdownMenuItem>   <LogOut /> <Link href="/api/auth/signout">Sign Out</Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <Button asChild variant="outline">
                </Button>
              </>
            )}


          </div>
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" size="icon">
                <MenuIcon className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="max-h-screen overflow-auto">
              <SheetHeader>
                <SheetTitle>
                 <Link
            href="/"
            className="flex items-center gap-2"
          >

            <ShoppingCart className="size-8" />
            <span className="text-2xl font-semibold tracking-tighter">
              Exclusive
            </span>
          </Link>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col p-4">

                <div className="flex flex-col gap-6">
                  {
                    links.map((link, index) => (
                      <Link key={index} href={link.path} className={cn("font-medium", pathname === link.path ? "text-red-500" : "")}>
                        {link.label}
                      </Link>
                    ))
                  }

                </div>
                <div className="mt-6 flex flex-col gap-4">
                  {status === "loading" ? (
                    <span>Loading...</span>
                  ) : status === "unauthenticated" ? (
                    <>
                      <Button asChild variant="outline">
                        <Link href="/login">Sign in</Link>
                      </Button>
                      <Button asChild>
                        <Link href="/register">Sign Up</Link>
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link href="/allorders" className="text-md font- ">My Orders</Link>
                      <div className="flex gap-2 items-center">  
                        <User className="text-red-500 size-8" /> 
                        <Link href="/profile" className="text-red-500 font-semibold">{session?.user.name}</Link >
                      </div>



                      <div className="flex gap-4">
                        <Link className="relative" href="/cart">
                          <Badge
                            className="  h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
                            variant="destructive"
                          >
                            {CartDetails?.numOfCartItems}
                          </Badge>
                          <ShoppingCart className="size-7" />
                        </Link>
                        <Link className="relative" href="/wishlist">
                          <Badge
                            className=" h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
                            variant="destructive"
                          >
                            {WishlistDetails?.count}
                          </Badge>
                          <Heart className="size-7" />
                        </Link>
                      </div>
                      <Button asChild variant="outline">
                        <Link href="/api/auth/signout">Sign Out</Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
      {/* <Separator className="mt-4" /> */}

    </section>
  );
};

export default Navbar;
