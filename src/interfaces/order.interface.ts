export declare interface IOrdersResponse {
  results: number;
  metadata: IPagination;
  data: IOrder[];
}

export interface IPagination {
  currentPage: number;
  numberOfPages: number;
  limit: number;
}

export interface IOrder {
  _id: string;
  user: IUser;
  cartItems: ICartItem[];
  shippingAddress?: IShippingAddress;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  createdAt: string;
  updatedAt: string;
  paidAt?: string;
  __v: number;
}

export interface IShippingAddress {
  details: string;
  city: string;
  phone?: string;
  postalCode?: string;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

export interface ICartItem {
  _id: string;
  count: number;
  price: number; // unit price
  product: IProduct;
}

export interface IProduct {
  _id: string;
  id: string; // لو فعلاً موجود من الـ API
  title: string;
  imageCover: string;
  ratingsAverage: number;
  ratingsQuantity: number;
  category: ICategory;
  brand: IBrand;
  subcategory: ISubcategory[];
}

export interface ISubcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface IBrand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}
