"use client";

import FeedbackCard from "@/components/Feedback__card";
import React, { useEffect, useState } from "react";

import "../styles/feedback.css";
import SwiperFeedbackComponent from "@/components/SwiperFeedbackComponent";

const Feedback = () => {
  const [title, setTitle] = useState("Мнения наших клиентов");

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth > 576) {
        setTitle("Мнения наших клиентов");
      } else {
        setTitle("Отзывы");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
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

export default Feedback;
