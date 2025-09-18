"use client"
import React, { useContext, createContext, useState, useEffect } from 'react'

import { getCart } from '@/services/cart.service';
import { ICartResponse } from './../interfaces/cart.interface';

interface ICartContext {
  CartDetails: ICartResponse | null;
  setCartDetails: React.Dispatch<React.SetStateAction<ICartResponse | null>>;
  getCartDetails: () => Promise<void>;
}
const CartContext = createContext<ICartContext | null>(null)

export function CartContextProvider({ children }: { children: React.ReactNode }) {
  const [CartDetails, setCartDetails] = useState<ICartResponse | null>(null)

 async function getCartDetails() {
      const data = await getCart()
      setCartDetails(data);
    }


  useEffect(() => {
   
    getCartDetails();
  }, [])

  return (
    <CartContext.Provider value={{ CartDetails, setCartDetails ,getCartDetails}}>
      {children}
    </CartContext.Provider>
  )
}




export function useCart() {


  const context = useContext(CartContext)

  if (!context) {
    throw new Error("useCart must be used within a CartContextProvider")
  }

  return context;
}
