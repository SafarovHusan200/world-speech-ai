// SafetyCard.js
import React from "react";

const SafetyCard = ({ img, title, description }) => {
  return (
    <div className="safety__card">
      <div className="safety__card--img">
        <img src={img} alt="" />
      </div>
      <div className="safety__card--title">{title}</div>
      <div className="safety__card--descr">{description}</div>
    </div>
  );
};

export default SafetyCard;
