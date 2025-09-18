import { IBrand } from './brand.interface'
  import { ISubcategory} from './subcategory.interface'
import { ICategory } from './category.interface'

export declare interface IProductResponse {
  results: number
  metadata: Metadata
  data: IProduct[]
}

export interface Metadata {
  currentPage: number
  numberOfPages: number
  limit: number
  nextPage: number
}

export interface IProduct {
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
  category: ICategory
  brand: IBrand
  ratingsAverage: number
  createdAt: string
  updatedAt: string
  id: string
  priceAfterDiscount?: number
  availableColors?: string
}




