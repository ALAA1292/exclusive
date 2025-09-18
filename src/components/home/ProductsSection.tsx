import React from 'react'
import { getProducts } from '@/services/products.service';
import { IProduct } from '@/interfaces/product.interface';
import Link from 'next/link';
import {Button} from "@/components/ui/button";
import ProductItem from "@/components/products/ProductItem";
import TitleSection from '../shared/TitleSection';
export default async function ProductsSection() {


    const { data: products }: { data: IProduct[] } = await getProducts(8);
    return (
<>
 <div>
            <section className='py-10'>
                
                <div className="container mx-auto">
                    <TitleSection title={"Our Products"} subtitle={"Explore Our Products"}/>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-15">
                        {
                            products && products.map((product => (
                               <ProductItem key={product._id} product={product} />
                            )))
                        }
                    </div>

                    <div className="flex justify-center items-center mt-4">
                        <Button asChild variant="destructive" > 
                            <Link href="/products"> view all products </Link>
                        </Button>

                    </div>
                </div>
            </section>
        </div></>
       
    )
}
