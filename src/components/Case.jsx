"use client";

import React, { useEffect, useState } from "react";

import "../styles/feedback.css";
import SwiperFeedbackComponent from "@/components/SwiperFeedbackComponent";
import useHttp from "@/app/hooks/useHttp";
import { URLS } from "@/constants/url";
import { baseAPI } from "@/constants/domain";

const Case = () => {
  const [title, setTitle] = useState("Кейсы");

  const { request, loading, error } = useHttp();
  const [cases, setCases] = useState([]);

  const getSmartGPT = async () => {
    const url = baseAPI + URLS.cases;
    try {
      const response = await request(url, "GET");

      setCases(response);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    getSmartGPT();
  }, []);

  return (
    <section className="feedback" id="feedback">
      <div className="container">
        <div className="section-title">{title}</div>

        <div className="feedback__cards">
          <SwiperFeedbackComponent cases={cases} />
        </div>
      </div>
    </section>
  );
};

export default Case;
