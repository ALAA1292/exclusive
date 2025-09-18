
import { ISubcategory } from "./subcategory.interface"

export interface IWishlistResponse {
  status: string
  count: number
  data: IWishlist[]
}

export interface IWishlist {
  sold?: number
  images: string[]
  subcategory: ISubcategory[]
  ratingsQuantity: number
  _id: string
  title: string
  slug: string
  description: string
  quantity: number
  price: number
  imageCover: string
  category: Category
  brand: Brand
  ratingsAverage: number
  createdAt: string
  updatedAt: string
  __v: number
  id: string
  priceAfterDiscount?: number
}



export interface Category {
  _id: string
  name: string
  slug: string
  image: string
}

export interface Brand {
  _id: string
  name: string
  slug: string
  image: string
}
