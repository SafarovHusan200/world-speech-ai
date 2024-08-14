"use client";

import Accordion from "@/components/Accordion";
import React from "react";

import "../styles/faq.css";

const Faq = () => {
  const items = [
    {
      title: "Как преобразовать видео в текст?",
      content:
        "Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. ",
    },
    {
      title: "Можно транскрибировать аудио в текст?",
      content:
        "Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. ",
    },
    {
      title: "Максимальная продолжительность видео для преобразования в текст?",
      content:
        "Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. ",
    },
    {
      title: "Какие форматы файлов принимает Teamlogs?",
      content:
        "Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. ",
    },
    {
      title: "Как получить тестовый доступ к журналам Teamlogs? ",
      content:
        "Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. ",
    },
    {
      title: "Как получить больше минут для транскрибации?",
      content:
        "Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. ",
    },
    {
      title: "Сгорают ли приобретенные минуты?",
      content:
        "Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. ",
    },
    {
      title: "Как я могу оплатить сервис со счета ООО или ИП?",
      content:
        "Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. ",
    },
    {
      title: "Как команды используют Worldspeechai?",
      content:
        "Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. ",
    },
    {
      title: "Как получить тестовый доступ к Teamlogs?",
      content:
        "Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. Lorem ipsum dolor sit amet consectetur. Ipsum dictum neque vulputate suspendisse odio. ",
    },
  ];
  return (
    <section className="faq" id="faq">
      <div className="container">
        <div className="section-title">Часто задаваемые вопросы</div>

        <Accordion items={items} />
      </div>
    </section>
  );
};

export default Faq;
