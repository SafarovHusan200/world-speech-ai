import Link from "next/link";
import React from "react";

const ProjectNewsCardInSwiper = () => {
  return (
    <div className="news__card--item">
      <div className="news__card--item__left">
        <img src="/news-swiper-img.jpg" alt="img" />
      </div>
      <div className="news__card--item__right">
        <div className="news__card--item__right--top">
          <div className="row">
            <div className="news__card--title">
              Название новости Название новостиНазвание новости
            </div>
            <div className="news__card--date">12 марта 2024</div>
          </div>

          <div className="news__card--descr">
            Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate
            suspendisse odio
          </div>
        </div>

        <div className="news__card--item__right--bottom">
          <Link href={"/project-news/1"}>Посмотреть полностью</Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectNewsCardInSwiper;
