"use client";

import React, { useEffect, useState } from "react";
import "../../styles/project-news.css";

import ProjectNewsSwiper from "@/components/projectNewsSwiper";
import NewsCard from "@/components/News__card";

const newsData = [
  {
    img: "/news-img.jpg",
    name: "Название новости Название новостиНазвание новости",
    date: "12 марта 2024",
    descr:
      "Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio.",
  },
  {
    img: "/news-img.jpg",
    name: "Название новости Название новостиНазвание новости",
    date: "12 марта 2024",
    descr:
      "Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio.",
  },
  {
    img: "/news-img.jpg",
    name: "Название новости Название новостиНазвание новости",
    date: "12 марта 2024",
    descr:
      "Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio.",
  },
  {
    img: "/news-img.jpg",
    name: "Название новости Название новостиНазвание новости",
    date: "12 марта 2024",
    descr:
      "Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio.",
  },
  {
    img: "/news-img.jpg",
    name: "Название новости Название новостиНазвание новости",
    date: "12 марта 2024",
    descr:
      "Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio.",
  },
  {
    img: "/news-img.jpg",
    name: "Название новости Название новостиНазвание новости",
    date: "12 марта 2024",
    descr:
      "Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio.",
  },
  {
    img: "/news-img.jpg",
    name: "Название новости Название новостиНазвание новости",
    date: "12 марта 2024",
    descr:
      "Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio.",
  },
  {
    img: "/news-img.jpg",
    name: "Название новости Название новостиНазвание новости",
    date: "12 марта 2024",
    descr:
      "Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio.",
  },
  {
    img: "/news-img.jpg",
    name: "Название новости Название новостиНазвание новости",
    date: "12 марта 2024",
    descr:
      "Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio.",
  },
  {
    img: "/news-img.jpg",
    name: "Название новости Название новостиНазвание новости",
    date: "12 марта 2024",
    descr:
      "Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio.",
  },
  {
    img: "/news-img.jpg",
    name: "Название новости Название новостиНазвание новости",
    date: "12 марта 2024",
    descr:
      "Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio.",
  },
  {
    img: "/news-img.jpg",
    name: "Название новости Название новостиНазвание новости",
    date: "12 марта 2024",
    descr:
      "Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio.",
  },
  // Repeat or add more news items as needed
];

const ProjectNews = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
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

  const visibleNewsData = isMobile ? newsData.slice(0, 6) : newsData;

  return (
    <div className="project__news">
      <div className="container">
        <div className="section-title">Новости проекта</div>
        <ProjectNewsSwiper />

        <div className="cards">
          {visibleNewsData.map((news, index) => (
            <NewsCard
              key={index}
              img={news.img}
              name={news.name}
              date={news.date}
              descr={news.descr}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectNews;
