"use client";
import React, { useState } from "react";

const FeedbackCard = ({ id, title, name, date, descr }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const descriptionFunction = (descr) => {
    const words = descr.split(" ");
    if (words.length > 83 && !isExpanded) {
      const shortDescr = words.slice(0, 83).join(" ");
      return `${shortDescr}...`;
    }
    return descr;
  };

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className="feedback__card"
      style={{ backgroundImage: `url(/keys-${id}.jpg)` }}
    >
      <div className="feedback__card--name">Кейс {id}</div>
      {/* <div className="feedback__card--date">{date}</div> */}

      <div className="keys__card__bottom">
        <div className="feedback__card--date">{title}</div>

        <button
          className="feedback__card--btn"
          onClick={handleClick}
          aria-expanded={isExpanded}
        >
          {isExpanded ? "Скрыть" : "Смотреть"}
        </button>
      </div>
    </div>
  );
};

export default FeedbackCard;
