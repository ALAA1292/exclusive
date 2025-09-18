import React from 'react'
import Image from 'next/image'
import { ICategory } from '@/interfaces/category.interface'
import { getCategoryDetails } from '@/services/categoryDetails.service'

export default async function CategoryDetailsPage({
  params: { categoryId },
}: {
  params: { categoryId: string }
}) {
  const { data: category }: { data: ICategory } = await getCategoryDetails(categoryId)

  if (!category) {
    return (
      <section className="py-20 text-center">
        <p className="text-gray-500">Category not found.</p>
      </section>
    )
  }

  const formattedDate = new Date(category.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <section className="py-20 min-h-screen">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <Image
              src={category.image}
              alt={category.name}
              width={500}
              height={400}
              loading="lazy"
              className="mb-4 w-full h-[21.5rem] object-contain bg-gray-200 rounded-xl"
            />
          </div>

          <div className="lg:col-span-1">
            <h1 className="font-semibold text-2xl mb-4">{category.name}</h1>
            <div className="flex items-center gap-x-2 mb-4 text-gray-500 text-sm">
              <span>Created on:</span>
              <span className="font-medium">{formattedDate}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
