"use client";
import Link from "next/link";
import React from "react";

const ProjectNewsCardInSwiper = ({ news }) => {
  console.log("news", news);
  return (
    <div className="news__card--item">
      <div className="news__card--item__left">
        <img src={news?.image || "/news-swiper-img.jpg"} alt="img" />
      </div>
      <div className="news__card--item__right">
        <div className="news__card--item__right--top">
          <div className="row">
            <div className="news__card--title">{news.title}</div>
            <div className="news__card--date">
              {new Date(news.publication_date).toLocaleDateString("ru-RU") ||
                "12 марта 2024"}
            </div>
          </div>

          <div className="news__card--descr">{news.description}</div>
        </div>

        <div className="news__card--item__right--bottom">
          <Link href={`/project-news/${news.id}`}>Посмотреть полностью</Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectNewsCardInSwiper;
