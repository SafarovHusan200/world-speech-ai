"use client";

import React, { useState } from "react";

import "../styles/feedback.css";
import SwiperFeedbackComponent from "@/components/SwiperFeedbackComponent";

const Case = () => {
  const [title, setTitle] = useState("Кейсы");

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.innerWidth > 576) {
  //       setTitle("Мнения наших клиентов");
  //     } else {
  //       setTitle("Отзывы");
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);
  return (
    <section className="feedback" id="feedback">
      <div className="container">
        <div className="section-title">{title}</div>

        <div className="feedback__cards">
          <SwiperFeedbackComponent />
        </div>
      </div>
    </section>
  );
};

export default Case;
