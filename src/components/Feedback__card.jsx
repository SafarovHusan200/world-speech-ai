"use client";

import React, { useEffect, useState } from "react";
import MyModal from "./Modal";

const FeedbackCard = ({ id, title, problem, solution, image, results }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleClick = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <div
      className="feedback__card"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="feedback__card--name">Кейс {id}</div>

      <div className="keys__card__bottom">
        <div className="feedback__card--title">{title}</div>

        <button
          className="feedback__card--btn"
          onClick={handleClick}
          // aria-expanded={isModalVisible}
        >
          Смотреть
        </button>
      </div>

      <MyModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        title={title}
        problem={problem}
        solution={solution}
        image={image}
        results={results}
      />
    </div>
  );
};

export default FeedbackCard;
