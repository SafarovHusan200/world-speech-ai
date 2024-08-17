import React from "react";

const MeetingCard = ({ number, img, name, description }) => {
  return (
    <div className="card">
      {number && <div className="card__number">{number}</div>}
      <div className="card__icon">
        {img?.map((icon) => (
          <img key={icon} src={icon} alt="icon" />
        ))}
      </div>
      <div className="card__name">{name}</div>
      <div className="card__descr">{description}</div>
    </div>
  );
};

export default MeetingCard;
