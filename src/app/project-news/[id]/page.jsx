"use client";

import React, { useEffect, useState } from "react";
import "../../../styles/project-news-one.css";
import NewsCard from "@/components/News__card";
import { baseAPI } from "@/constants/domain";
import { URLS } from "@/constants/url";
import axios from "axios";
import { usePathname } from "next/navigation";
import Loading from "@/components/Loading";

const ProjectNewsOne = () => {
  const [newsData, setNewsData] = useState(null);
  const [fullNews, setFullNews] = useState();
  const pathname = usePathname();

  const id = pathname.split("/").pop();

  const getNews = async () => {
    const url = baseAPI + URLS.news + id;
    try {
      const response = await axios.get(url);
      setNewsData(response.data);
    } catch (err) {
      console.error("Error fetching news data:", err);
    }
  };

  const getallNews = async () => {
    const url = baseAPI + URLS.news;
    try {
      const response = await axios.get(url);

      setFullNews(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getNews();
    getallNews();
  }, []);

  if (!newsData) {
    return <Loading />;
  }

  return (
    <div className="project__news--one">
      <div className="container">
        <div className="project__news--one__img">
          <img
            className="project__news--one__img"
            src={newsData.image || "/project__news-one.jpg"}
            alt="news image"
          />
        </div>

        <div className="project__news--one__content">
          <div className="row">
            <div className="title">{newsData.title || "Новости проекта"}</div>
            <span className="date">
              {new Date(newsData.publication_date).toLocaleDateString("ru-RU")}
            </span>
          </div>

          <p className="descr">
            {newsData.description || "Описание новости..."}
          </p>
        </div>

        {newsData.subsections &&
          newsData.subsections.map((subsection, index) => (
            <div className="project__news--one__content" key={index}>
              <div className="row">
                <div className="title">
                  {subsection.title || "Подзаголовок"}
                </div>
              </div>
              <p className="descr">
                {subsection.content || "Описание раздела..."}
              </p>
            </div>
          ))}

        <div className="cards">
          {/* Example static cards. Replace with dynamic data if necessary */}

          {fullNews?.map((n) => (
            <NewsCard
              img={n.image || "/news-img.jpg"}
              name={
                n.title || "Название новости Название новостиНазвание новости"
              }
              date={new Date(n.publication_date).toLocaleDateString("ru-RU")}
              descr={
                n.description ||
                "Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. "
              }
            />
          ))}

          {/* More <NewsCard /> components */}
        </div>
      </div>
    </div>
  );
};

export default ProjectNewsOne;
