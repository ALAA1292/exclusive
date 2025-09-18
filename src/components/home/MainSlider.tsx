"use client"
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { Autoplay } from 'swiper/modules';

import Image from 'next/image';
import slide1 from "../../assets/images/slider-image-1.jpeg"
import slide2 from "../../assets/images/slider-image-2.jpeg"
import slide3 from "../../assets/images/slider-image-3.jpeg"

const SwiperOptions = {
    pagination: {
        clickable: true,
        bulletClass: "swiper-pagination-bullet !size-3",
        bulletActiveClass: "swiper-pagination-bullet-active !bg-red-300"
    },
    autoplay:{
        delay: 3000,
        disableOnInteraction: false
    },
    modules: [Pagination, Autoplay],

}

const Images = [
    {
        path: slide1.src,
        label: "slide 1"
    },
    {
        path: slide2.src,
        label: "slide 2"
    },
    {
        path: slide3.src,
        label: "slide 3"
    }

]
export default function MainSlider() {

    return (
        <section>
            <div className="container mx-auto mt-8">
                <div>

                    <Swiper {...SwiperOptions}>

                        {Images.map((image, index) => <SwiperSlide key={index}>

                            <Image
                                src={image.path}

                                alt={image.label}
                                width={892}
                                height={344}
                                loading='lazy'
                                className='w-full h-[21.5rem]'
                            />
                        </SwiperSlide>)}

                    </Swiper>
                </div>
            </div>

        </section>

    )
}
