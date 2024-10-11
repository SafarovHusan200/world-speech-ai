"use client";

import React, { useEffect, useState } from "react";
import "../../../styles/questions.css";
import useHttp from "@/app/hooks/useHttp";
import { baseAPI } from "@/constants/domain";
import Loading from "@/components/Loading";
import { message } from "antd";
import { URLS } from "@/constants/url";
import Accordion from "@/components/Accordion";

const Instructions = () => {
  const items = [
    {
      title: "Как преобразовать видео в текст?",
      content:
        "Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. ",
    },
    {
      title: "Как преобразовать видео в текст?",
      content:
        "Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. ",
    },
    {
      title: "Как преобразовать видео в текст?",
      content:
        "Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. ",
    },
    {
      title: "Как преобразовать видео в текст?",
      content:
        "Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. ",
    },
    {
      title: "Как преобразовать видео в текст?",
      content:
        "Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. ",
    },
    {
      title: "Как преобразовать видео в текст?",
      content:
        "Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. ",
    },
    {
      title: "Как преобразовать видео в текст?",
      content:
        "Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. ",
    },
    {
      title: "Как преобразовать видео в текст?",
      content:
        "Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. ",
    },
    {
      title: "Как преобразовать видео в текст?",
      content:
        "Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. ",
    },
  ];
  const { request, loading, error } = useHttp();
  const [transcriptions, setTranscriptions] = useState([]);
  const token =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("token")) || null
      : null;

  const getInstructions = async () => {
    const url = baseAPI + URLS.transcriptions;
    try {
      const response = await request(url, "GET");
      setTranscriptions(response);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  return (
    <div className="questions">
      <div className="section-title">Вопросы</div>
      <div className="questions__block">
        {loading && <Loading />}
        {error && <p>{error}</p>}

        <div className="questions__row">
          <div className="faq__block">
            <Accordion items={items} />
          </div>
          <div className="smartGPT__block">
            <div className="video__part">
              <button className="play__btn">
                <img src="/play__icon.svg" alt="svg" />
              </button>
            </div>

            <h3 className="smart__title">SmartGPT</h3>

            <p className="descr">
              Добро пожаловать в WorldspeechAI. Пожалуйста, прочтите дальше,
              чтобы ознакомиться с правилами и ограничениями, регулирующими
              использование вами наших веб-сайтов, продуктов, услуг и
              приложений, которые включают, но не ограничиваются, веб-приложение
              WorldspeechAI (“Сервис”). Услуги предоставляются и оплачиваются
              через ИП Жилкин Федор Игоревич. Если у вас есть какие-либо
              вопросы, комментарии или опасения относительно настоящих условий
              или Услуг, пожалуйста, свяжитесь с нами по адресу
              hello@WorldspeechAI.ai
            </p>
            <p className="descr">
              Настоящие Условия предоставления услуг (“Условия”) являются
              обязательным договором между вами и WorldspeechAI.ai (“мы” и
              “нас”). Вы должны согласиться и принять все Условия, в противном
              случае вы не имеете права пользоваться Услугами. Использование
              вами Сервиса любым способом означает, что вы согласны со всеми
              этими Условиями, и эти Условия будут оставаться в силе, пока вы
              пользуетесь Сервисом. Эти Условия включают положения настоящего
              документа, а также положения Политики конфиденциальности.
            </p>

            <p className="descr">
              Изменятся ли когда-нибудь эти условия? Мы постоянно пытаемся
              улучшить наши услуги, поэтому, возможно, потребуется изменить эти
              Условия вместе с Услугами. Мы оставляем за собой право изменять
              Условия в любое время, но если мы это сделаем, мы доведем это до
              вашего сведения, разместив уведомление на веб-сайте WorldspeechAI,
              отправив вам электронное письмо и/или каким-либо другим способом.
            </p>

            <p className="descr">
              Если вы не согласны с новыми Условиями, вы можете отклонить их; к
              сожалению, это означает, что вы больше не сможете пользоваться
              Услугами. Если вы каким-либо образом пользуетесь Услугами после
              вступления в силу изменений в Условиях, это означает, что вы
              согласны со всеми изменениями.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
