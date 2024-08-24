"use client";

import React, { useEffect, useState } from "react";
import "../../styles/project-news.css";

import ProjectNewsSwiper from "@/components/projectNewsSwiper";
import NewsCard from "@/components/News__card";
import { baseAPI } from "@/constants/domain";
import { URLS } from "@/constants/url";
import axios from "axios";

// const newsData = [
//   {
//     img: "/news-img.jpg",
//     name: "Название новости Название новостиНазвание новости",
//     date: "12 марта 2024",
//     descr:
//       "Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio.",
//   },
//   {
//     img: "/news-img.jpg",
//     name: "Название новости Название новостиНазвание новости",
//     date: "12 марта 2024",
//     descr:
//       "Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio.",
//   },
//   {
//     img: "/news-img.jpg",
//     name: "Название новости Название новостиНазвание новости",
//     date: "12 марта 2024",
//     descr:
//       "Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio.",
//   },
//   {
//     img: "/news-img.jpg",
//     name: "Название новости Название новостиНазвание новости",
//     date: "12 марта 2024",
//     descr:
//       "Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio.",
//   },
//   {
//     img: "/news-img.jpg",
//     name: "Название новости Название новостиНазвание новости",
//     date: "12 марта 2024",
//     descr:
//       "Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio.",
//   },
//   {
//     img: "/news-img.jpg",
//     name: "Название новости Название новостиНазвание новости",
//     date: "12 марта 2024",
//     descr:
//       "Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio.",
//   },
//   {
//     img: "/news-img.jpg",
//     name: "Название новости Название новостиНазвание новости",
//     date: "12 марта 2024",
//     descr:
//       "Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio.",
//   },
//   {
//     img: "/news-img.jpg",
//     name: "Название новости Название новостиНазвание новости",
//     date: "12 марта 2024",
//     descr:
//       "Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio.",
//   },
//   {
//     img: "/news-img.jpg",
//     name: "Название новости Название новостиНазвание новости",
//     date: "12 марта 2024",
//     descr:
//       "Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio.",
//   },
//   {
//     img: "/news-img.jpg",
//     name: "Название новости Название новостиНазвание новости",
//     date: "12 марта 2024",
//     descr:
//       "Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio.",
//   },
//   {
//     img: "/news-img.jpg",
//     name: "Название новости Название новостиНазвание новости",
//     date: "12 марта 2024",
//     descr:
//       "Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio.",
//   },
//   {
//     img: "/news-img.jpg",
//     name: "Название новости Название новостиНазвание новости",
//     date: "12 марта 2024",
//     descr:
//       "Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio.",
//   },
//   // Repeat or add more news items as needed
// ];

const ProjectNews = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [newsData, setNewsData] = useState();

  const getNews = async () => {
    const url = baseAPI + URLS.news;
    try {
      const response = await axios.get(url);

      setNewsData(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getNews();
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 920);
    };

    // Initialize the state
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="project__news">
      <div className="container">
        <div className="section-title">Новости проекта</div>
        <ProjectNewsSwiper newsData={newsData} />

        <div className="cards">
          {newsData?.map((newsItem, index) => (
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectNews;
