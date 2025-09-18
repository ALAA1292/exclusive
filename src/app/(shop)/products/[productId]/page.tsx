import { IProduct } from '@/interfaces/product.interface';
import { getProductDetails } from '@/services/productDetails.service'
import React from 'react'
import { RefreshCcw, Star, Truck } from 'lucide-react';
import ProductSwiper from '@/components/products/ProductSwiper';
import Addtocartbtn from '@/components/products/Addtocartbtn';
import Wishlistbtn from '@/components/products/Wishlistbtn';
import { getProducts } from '@/services/products.service';
import ProductItem from '@/components/products/ProductItem';
import TitleSection from '@/components/shared/TitleSection';


export default async function ProductDetails({ params: { productId } }: { params: { productId: string } }) {

  const { data: product }: { data: IProduct } = await getProductDetails(productId)
  console.log(product);

const { data: products }: { data: IProduct[] } = await getProducts();
    console.log(products)
    

//related items by title    
function getRelatedItemsByTitle(product: IProduct, products: IProduct[]) {
  if (!product || !products) return [];

  const keyword = product.title?.split(" ")[0]?.toLowerCase();

  return products.filter(
    (p) =>
      p._id !== product._id && 
      p.title?.toLowerCase().includes(keyword)
  )
  .slice(0, 4);
}


const relatedItems = getRelatedItemsByTitle(product, products);
  

//related items by price for browsing
function getRelatedItemsByPrice(product: IProduct, products: IProduct[]) {
  if (!product || !products) return [];

  const price = product.price;
  const minPrice = price * 0.8; 
  const maxPrice = price * 1.2; 

  return products
    .filter(
      (p) =>
        p._id !== product._id &&
        p.price >= minPrice &&
        p.price <= maxPrice
    )
    .slice(0, 4); 
}

const browse = getRelatedItemsByPrice(product, products);
const itemsToShow = relatedItems.length > 0 ? relatedItems : browse;


  return (
  <section className='py-20 min-h-screen px-4'>
    <div className="container mx-auto flex mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
        <div className='lg:col-span-2'>

          <ProductSwiper images={product.images} />
        </div>
        <div className="lg:col-span-1">
          <h1 className='font-semibold text-2xl mb-4'>{product.title}</h1>
          <div className='flex items-center gap-x-1 mb-4'>
            <Star className='text-yellow-400 fill-yellow-400' />
            <span className="text-sm font-semibold text-gray-500">{product.ratingsAverage}</span>
          </div>
          <span className="text-2xl mb-6 block">{product.price} EGP</span>
          <p className='text-sm border-b pb-6 mb-6 border-b-gray-400'>{product.description}</p>


<div className="flex wrap gap-2 mb-10">
  <Addtocartbtn
    className="min-w-70 bg-red-500"
    productID={product._id}
  />
  <Wishlistbtn
    productID={productId}
    className="text-gray-700 cursor-pointer"
  />
</div>





 <ul className='border border-black/50 divide-y divide-black/50'>
<li className='p-3 flex gap-4'>
<Truck size={30}/>
<div className='font-medium'>
<p className='mb-2'>Free Delivery</p>
<span className='text-xs'>Enter your postal code for delivery Availability</span>
</div>
</li>

<li className='p-3 flex gap-4'>
<RefreshCcw size={30}/>
<div className='font-medium'>
<p className='mb-2'>Return Delivery</p>
<span className='text-xs'>Free 30 Days Delivery Returns. Details</span>
</div>
</li>
 </ul>
        </div>
      </div>
    </div>
   {itemsToShow.length>0 && 
      <div className="container mx-auto mt-20 mb-10">
        <TitleSection title={relatedItems.length > 0 ? "Related Items" : "You can also browse"} subtitle=''/>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-x-8 gap-y-15 ">
                            {
                                itemsToShow && itemsToShow.map((itemToShow => (
                                   <ProductItem key={itemToShow._id} product={itemToShow} />
                                )))
                            }
                        </div>
    
    </div>} 
 
  </section>
  )
}
