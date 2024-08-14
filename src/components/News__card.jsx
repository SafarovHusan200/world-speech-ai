"use client";

import Link from "next/link";
import React, { useState } from "react";

const NewsCard = ({ img, name, date, descr }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const descriptionFunction = (descr) => {
    const words = descr?.split(" ");
    if (words?.length > 36 && !isExpanded) {
      const shortDescr = words?.slice(0, 36).join(" ");
      return `${shortDescr}...`;
    }
    return descr;
  };

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="news__card">
      <img src={img} alt="img" />
      <div className="news__card--content">
        <div className="news__card--name">{name}</div>
        <div className="news__card--date">{date}</div>
        <div className="news__card--descr">{descriptionFunction(descr)}</div>
        <Link
          href={"/project-news/1"}
          className="news__card--btn"
          onClick={handleClick}
        >
          {isExpanded ? "Скрыть" : "Посмотреть полностью"}
        </Link>
      </div>
    </div>
  );
};

export default NewsCard;
