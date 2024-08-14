"use client";

import React from "react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import ProjectNewsCardInSwiper from "./projectNewsCardInSwiper";

const ProjectNewsSwiper = () => {
  return (
    <Swiper
      loop={true}
      modules={[Navigation, Pagination, A11y, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      // direction={"horizontal"}
    >
      <SwiperSlide>
        <ProjectNewsCardInSwiper />
      </SwiperSlide>
      <SwiperSlide>
        <ProjectNewsCardInSwiper />
      </SwiperSlide>
      <SwiperSlide>
        <ProjectNewsCardInSwiper />
      </SwiperSlide>
      <SwiperSlide>
        <ProjectNewsCardInSwiper />
      </SwiperSlide>
    </Swiper>
  );
};

export default ProjectNewsSwiper;
