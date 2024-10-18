"use client";
import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import FeedbackCard from "./Feedback__card";
import Loading from "./Loading";

const SwiperFeedbackComponent = ({ cases }) => {
  return (
    <>
      {cases.length > 0 ? (
        cases?.map((item, i) => (
          <FeedbackCard
            key={i}
            id={item.id}
            title={item.title}
            problem={item.problem}
            solution={item.solution}
            image={item.image}
            results={item.results}
          />
        ))
      ) : (
        <Loading />
      )}
    </>
  );
};

export default SwiperFeedbackComponent;
