import React from 'react'
import Image from 'next/image'
import { getBrands } from '@/services/brands.service'
import Link from 'next/link';
import { IBrand } from '@/interfaces/brand.interface';

export default async function BrandsPage() {
  const { data: brands }: { data: IBrand[] } = await getBrands()

  return (
    <div>
      <section className="py-10 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-15">
            {brands.map((brand) => (
              <div key={brand._id} className="text-center">
                <Link href={`/brands/${brand._id}`} >
                <Image
                  src={brand.image}
                  alt={brand.name}
                  width={270}
                  height={150}
                  loading="lazy"
                  className="mb-4 w-full h-[21.5rem] object-contain bg-gray-200"
                />
                </Link>
                                <Link href={`/brands/${brand._id}`} className="block mb-4">
                                  <h3 className="font-medium">{brand.name}</h3>
                                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
