"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const NewsCard = ({ id, img, name, date, descr }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();

  const descriptionFunction = (descr) => {
    const words = descr?.split(" ");
    if (words?.length > 36 && !isExpanded) {
      const shortDescr = words?.slice(0, 36).join(" ");
      return `${shortDescr}...`;
    }
    return descr;
  };

  const handleClick = (id) => {
    // setIsExpanded(!isExpanded);
    router.push(`/project-news/${id}`);
  };

  return (
    <div className="news__card">
      <img src={img} alt="img" />
      <div className="news__card--content">
        <div className="news__card--name">{name}</div>
        <div className="news__card--date">{date}</div>
        <div className="news__card--descr">{descriptionFunction(descr)}</div>
        <Link href={`/project-news/${id}`} className="news__card--btn">
          {isExpanded ? "Скрыть" : "Посмотреть полностью"}
        </Link>
      </div>
    </div>
  );
};

export default NewsCard;
