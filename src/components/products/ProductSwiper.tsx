"use client"
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Thumbs } from "swiper/modules";
import Image from "next/image";
import React, { useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import type { Swiper as SwiperType } from "swiper";
export default function ProductSwiper({ images }: { images: string[] }) {
const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  return (
    <div className="flex gap-4">
      <Swiper
        onSwiper={setThumbsSwiper}
        direction="vertical"
        slidesPerView={4}
         spaceBetween={15} 
  className="w-35 h-[37.5rem] " 
      >
        {images.map((img, idx) => (
          <SwiperSlide key={idx}>
            <Image
              src={img}
              alt={`thumb-${idx}`}
              width={120}
              height={120}
              className=" w-full h-full object-covercursor-pointer "
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Main swiper */}
      <Swiper
        loop={true}
        pagination={{
          clickable: true,
          bulletClass:
            "swiper-pagination-bullet !size-4 border-2",
          bulletActiveClass:
            "swiper-pagination-bullet-active !bg-red-500 border-white",
        }}
        modules={[Pagination, Thumbs]}
        thumbs={{ swiper: thumbsSwiper }}
        className="main-slider w-full"
      >
        {images.map((img, idx) => (
          <SwiperSlide key={idx}>
            <Image
              src={img}
              alt={`image-${idx}`}
              width={500}
              height={500}
              className="mx-auto w-full object-contain h-[37.5rem] bg-gray-100"
              loading="lazy"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
