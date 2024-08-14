"use client";
import React from "react";
import { Navigation, A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import NewsCard from "./News__card";

const SwiperNewsComponent = () => {
  return (
    <Swiper
      // install Swiper modules
      loop={true}
      modules={[Navigation, A11y, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      // autoplay={{ delay: 3000 }} // 3 seconds
      direction="horizontal"
      allowTouchMove={true}
      breakpoints={{
        0: {
          slidesPerView: 1,
          spaceBetween: 5,
          direction: "vertical",
          allowTouchMove: false,
        },

        576: {
          slidesPerView: 1,
          spaceBetween: 15,
          direction: "horizontal",
          allowTouchMove: true,
        },
      }}
    >
      <SwiperSlide>
        <NewsCard
          img={"/news-img.jpg"}
          name={"Название новости Название новостиНазвание новости"}
          date={"12 марта 2024"}
          descr={
            "Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. "
          }
        />

        <NewsCard
          img={"/news-img.jpg"}
          name={"Название новости Название новостиНазвание новости"}
          date={"12 марта 2024"}
          descr={
            "Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. "
          }
        />

        <NewsCard
          img={"/news-img.jpg"}
          name={"Название новости Название новостиНазвание новости"}
          date={"12 марта 2024"}
          descr={
            "Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. "
          }
        />

        <NewsCard
          img={"/news-img.jpg"}
          name={"Название новости Название новостиНазвание новости"}
          date={"12 марта 2024"}
          descr={
            "Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. "
          }
        />
      </SwiperSlide>
      <SwiperSlide>
        <NewsCard
          img={"/news-img.jpg"}
          name={"Название новости Название новостиНазвание новости"}
          date={"12 марта 2024"}
          descr={
            "Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. "
          }
        />

        <NewsCard
          img={"/news-img.jpg"}
          name={"Название новости Название новостиНазвание новости"}
          date={"12 марта 2024"}
          descr={
            "Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. "
          }
        />

        <NewsCard
          img={"/news-img.jpg"}
          name={"Название новости Название новостиНазвание новости"}
          date={"12 марта 2024"}
          descr={
            "Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. "
          }
        />

        <NewsCard
          img={"/news-img.jpg"}
          name={"Название новости Название новостиНазвание новости"}
          date={"12 марта 2024"}
          descr={
            "Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. "
          }
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default SwiperNewsComponent;
