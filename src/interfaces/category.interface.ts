export declare interface ICategoryResponse {
  results: number
  metadata: IPagination
  data: ICategory[]
}

export interface IPagination {
  currentPage: number
  numberOfPages: number
  limit: number
}

export interface ICategory{
  _id: string
  name: string
  slug: string
  image: string
  createdAt: string
  updatedAt: string
}
