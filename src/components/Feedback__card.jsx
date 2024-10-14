"use client";

import React, { useState } from "react";
import MyModal from "./Modal";

const FeedbackCard = ({ id, title, name, date, descr }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleClick = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <div
      className="feedback__card"
      style={{ backgroundImage: `url(/keys-${id}.jpg)` }}
    >
      <div className="feedback__card--name">Кейс {id}</div>

      <div className="keys__card__bottom">
        <div className="feedback__card--date">{title}</div>

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
      />
    </div>
  );
};

export default FeedbackCard;
