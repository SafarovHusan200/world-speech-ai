"use client";
import React, { useEffect, useState, useLayoutEffect } from "react";
import { Navigation, A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import NewsCard from "./News__card";
import axios from "axios";
import { baseAPI } from "@/constants/domain";
import { URLS } from "@/constants/url";

const SwiperNewsComponent = () => {
  const [newsSlides, setNewsSlides] = useState([]);

  const getNews = async () => {
    const url = baseAPI + URLS.news;
    try {
      const response = await axios.get(url);
      if (response.data) {
        setNewsSlides(response?.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Sahifa yuklanganda va o'lcham o'zgarganda Swiper'ni qayta yuklash uchun handleResize
  const handleResize = () => {
    if (window.Swiper) {
      window.dispatchEvent(new Event("resize"));
    }
  };

  useLayoutEffect(() => {
    // Sahifa birinchi marta yuklanganda Swiper'ni qayta yuklash
    handleResize();
  }, []);

  useEffect(() => {
    // Sahifa yuklanganda yangiliklarni olib kelish
    getNews();

    // Ekran hajmi o'zgarganda Swiper'ni qayta yuklash uchun resize eventini qo'shish
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Swiper
        loop={true}
        modules={[Navigation, A11y, Autoplay]}
        spaceBetween={50}
        slidesPerView={4}
        navigation
        observer={true}
        observeParents={true}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          576: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          920: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1200: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
      >
        {newsSlides.map((newsItem, slideIndex) => (
          <SwiperSlide key={slideIndex}>
            <NewsCard
              key={newsItem.id}
              id={newsItem.id}
              img={newsItem.image || "/news-img.jpg"}
              name={newsItem.title || "Название новости"}
              date={
                new Date(newsItem.publication_date).toLocaleDateString(
                  "ru-RU"
                ) || "12 марта 2024"
              }
              descr={newsItem.description || "Описание новости..."}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default SwiperNewsComponent;
