import React from "react";

import "../../../styles/project-news-one.css";
import NewsCard from "@/components/News__card";

const ProjectNewsOne = () => {
  return (
    <div className="project__news--one">
      <div className="container">
        <div className="project__news--one__img">
          {/* <img src="/project__news-one.jpg" alt="img" /> */}
        </div>

        <div className="project__news--one__content">
          <div className="row">
            <div className="title">Новости проекта</div>
            <span className="date">12 марта 2024</span>
          </div>

          <p className="descr">
            Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate
            suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum
            dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet
            consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem
            ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate
            suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum
            dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet
            consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem
            ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate
            suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum
            dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet
            consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem
            ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate
            suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum
            dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet
            consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem
            ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate
            suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum
            dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet
            consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem
            ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate
            suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum
            dictum neque vulputate suspendisse odio.
          </p>
        </div>
        <div className="project__news--one__content">
          <div className="row">
            <div className="title">Подзаголовок</div>
          </div>

          <p className="descr">
            Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate
            suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum
            dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet
            consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem
            ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate
            suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum
            dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet
            consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem
            ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate
            suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum
            dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet
            consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem
            ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate
            suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum
            dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet
            consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem
            ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate
            suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum
            dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet
            consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem
            ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate
            suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum
            dictum neque vulputate suspendisse odio.
          </p>
        </div>
        <div className="project__news--one__content">
          <div className="row">
            <div className="title">Подзаголовок</div>
          </div>

          <p className="descr">
            Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate
            suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum
            dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet
            consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem
            ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate
            suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum
            dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet
            consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem
            ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate
            suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum
            dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet
            consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem
            ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate
            suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum
            dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet
            consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem
            ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate
            suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum
            dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet
            consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem
            ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate
            suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum
            dictum neque vulputate suspendisse odio.
          </p>
        </div>

        <div className="cards">
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
        </div>
      </div>
    </div>
  );
};

export default ProjectNewsOne;
