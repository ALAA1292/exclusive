import React from 'react'
import { IProduct } from '@/interfaces/product.interface'
import { IWishlist } from '@/interfaces/wishlist.interface'
import Image from 'next/image'
import { Star } from 'lucide-react'
import Link from 'next/link'
import Addtocartbtn from '../products/Addtocartbtn'
import Wishlistbtn from './Wishlistbtn'

type ProductType = IProduct | IWishlist

export default function ProductItem({
  product,
  isWishlistPage = false
}: {
  product: IProduct | IWishlist,
  isWishlistPage?: boolean
}) {
  const productId = (product as IProduct)._id || (product as IWishlist).id

  return (
    <div>
      <div key={productId}>
        <div className='relative overflow-hidden group'>
          {!isWishlistPage && <Wishlistbtn productID={productId} className="text-gray-700 absolute top-1 right-5 cursor-pointer border-0 outline-none focus:outline-none shadow-none bg-transparent" />}

          <Link href={`/products/${productId}`}>
            <Image
              src={product.imageCover}
              alt={product.title}
              width={270}
              height={250}
              loading='lazy'
              className='mb-4 w-full h-[21.5rem] object-contain bg-gray-200'
            />
          </Link>

          <Addtocartbtn
            productID={productId}
            className='w-full absolute bottom-[-50] group-hover:bottom-0 cursor-pointer group-hover:transition-all group-hover:duration-400 rounded-xs'
          />
        </div>

        <Link href={`/products/${productId}`}>
          <h3 className='line-clamp-1'>{product.title}</h3>
        </Link>

        <div className="flex items-center justify-between pe-8 py-4">
          <span className='text-red-500 font-medium'>
            {product.price} EGP
          </span>


          <Star className='size-4 text-yellow-400 ms-auto me-2 fill-yellow-400' />
          <span className='text-gray-500 '>
            ({product.ratingsAverage})
          </span>
        </div>
      </div>
    </div>
  )
}

