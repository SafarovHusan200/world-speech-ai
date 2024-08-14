import SwiperNewsComponent from "@/components/SwipperNewsComponent";
import React from "react";
import "../styles/news.css";
import Link from "next/link";

const News = () => {
  return (
    <section className="news" id="news">
      <div className="container">
        <div className="section-title">Новости проекта</div>

        <div className="news__cards">
          <SwiperNewsComponent />
        </div>
        <div className="btns">
          <Link href={"/project-news"} className="btn btn-outline all-view">
            Смотреть все
          </Link>
        </div>
      </div>
    </section>
  );
};

export default News;
