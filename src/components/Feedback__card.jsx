"use client";
import React, { useState } from "react";

const FeedbackCard = ({ name, date, descr }) => {
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
    <div className="feedback__card">
      <div className="feedback__card--name">{name}</div>
      <div className="feedback__card--date">{date}</div>
      <div className="feedback__card--descr">{descriptionFunction(descr)}</div>
      <button className="feedback__card--btn" onClick={handleClick}>
        {isExpanded ? "Скрыть" : "Посмотреть полностью"}
      </button>
    </div>
  );
};

export default FeedbackCard;
