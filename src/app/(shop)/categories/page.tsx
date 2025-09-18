import React from 'react'
import Image from 'next/image'
import { getCategories } from '@/services/categories.service'
import { ICategory } from '@/interfaces/category.interface'
import Link from 'next/link';

export default async function CategoriesPage() {
  const { data: categories }: { data: ICategory[] } = await getCategories()

  return (
    <div>
      <section className="py-10 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-15">
            {categories.map((cat) => (
              <div key={cat._id} className="text-center">
                <Link href={`/categories/${cat._id}`} >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  width={270}
                  height={250}
                  loading="lazy"
                  className="mb-4 w-full h-[21.5rem] object-contain bg-gray-200"
                />
                </Link>
                                <Link href={`/categories/${cat._id}`} className="block mb-4">
                                  <h3 className="font-medium">{cat.name}</h3>
                                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
