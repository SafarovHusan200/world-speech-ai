"use client";

import React from "react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import ProjectNewsCardInSwiper from "./projectNewsCardInSwiper";

const ProjectNewsSwiper = ({ newsData }) => {
  console.log("newsData", newsData);
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
      {newsData?.map((news) => {
        return (
          <SwiperSlide key={news.id}>
            <ProjectNewsCardInSwiper news={news} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default ProjectNewsSwiper;
