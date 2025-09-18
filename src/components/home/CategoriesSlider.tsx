"use client";
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { ICategory } from '@/interfaces/category.interface';
import Link from "next/link";

import Image from 'next/image';

const SwiperOptions = {

    breakpoints: {
        640: {
            slidesPerView: 2,
            spaceBetween: 20
        },
        768: {
            slidesPerView: 3,
            spaceBetween: 10

        },
        1200: {
            slidesPerView: 4,
            spaceBetween: 15

        },
        1600: {
            slidesPerView: 6,
            spaceBetween: 30

        },
    },
    pagination: {
        clickable: true,
        bulletClass: "swiper-pagination-bullet !size-3",
        bulletActiveClass: "swiper-pagination-bullet-active !bg-red-300"
    },

    modules: [Pagination],

}

export default function CategoriesSlider({ Categories }: { Categories: ICategory[] }) {
    return (
        <div>
            <Swiper className='categories-slider mb-20' {...SwiperOptions}>

                {Categories.map((cat) => <SwiperSlide className='mb-8' key={cat._id}>
                    <Link href={`/categories/${cat._id}`} >

                        <Image
                            src={cat.image}

                            alt={cat.name}
                            width={270}
                            height={250}
                            loading='lazy'
                            className='mb-4 w-full h-[21.5rem] object-contain bg-gray-200'
                        />
                    </Link>
                    <Link href={`/categories/${cat._id}`} >

                        <h3 className='font-medium'>{cat.name}</h3>
                    </Link>

                </SwiperSlide>)}

            </Swiper>
        </div>
    )
}
