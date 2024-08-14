// SafetyCardWidthBg.js
import React from "react";

const SafetyCardWidthBg = ({ title, bg }) => {
  return (
    <div
      className="safety__card__width__bg"
      style={{ background: `url(${bg})` }}
    >
      <div className="safety__card__width__bg--title">{title}</div>
    </div>
  );
};

export default SafetyCardWidthBg;
