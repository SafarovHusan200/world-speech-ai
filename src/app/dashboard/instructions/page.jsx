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
      title: "Можно ли транскрибировать аудио/видео в текст?",
      content:
        "Да, WorldSpeechAI поддерживает транскрибацию аудио и видео. Просто загрузите аудио- или видеофайл, и наша система быстро преобразует его в текстовый документ.",
    },
    {
      title:
        "Как получить больше минут, встреч и запросов для транскрибации/анализа?",
      content:
        "Вы можете приобрести дополнительные минуты, встречи и запросы через личный кабинет на нашем сайте или обновить тарифный план, чтобы увеличить их лимит.",
    },
    {
      title: "Сгорают ли приобретённые минуты, встречи и запросы?",
      content:
        "Да, оставшиеся минуты, встречи и запросы, предоставленные по тарифу, сгорают в конце периода действия подписки.",
    },
    {
      title: "Как получить тестовый доступ к WorldSpeechAI?",
      content:
        "Для получения тестового доступа зарегистрируйтесь на нашем сайте. Вы получите ограниченное количество минут, встреч и запросов для проверки возможностей WorldSpeechAI.",
    },
    {
      title: "Какие форматы встреч поддерживает WorldSpeechAI?",
      content:
        "WorldSpeechAI поддерживает встречи в Yandex Telemost, Zoom и Google Meet с последующим экспортом данных в формате текстовых стенограмм. Кроме того, система может интегрироваться с CRM-системами, такими как Bitrix24 и AmoCRM.",
    },
    {
      title: "Сколько встреч можно записывать одновременно?",
      content:
        "На текущий момент WorldSpeechAI может записывать только одну встречу одновременно. Для записи нескольких встреч потребуется завершить текущую или использовать дополнительные аккаунты.",
    },
    {
      title: "Какие форматы отчётов поддерживаются?",
      content:
        "WorldSpeechAI поддерживает экспорт отчётов в текстовые форматы, такие как TXT, PDF и DOCX.",
    },
    {
      title:
        "Как система работает с долгими встречами? Есть ли ограничения по времени?",
      content:
        "Ограничений по времени для проведения встреч нет. В системе работает счётчик минут, которые расходуются в соответствии с вашим тарифом.",
    },
    {
      title: "Какие языки поддерживает платформа?",
      content:
        "WorldSpeechAI поддерживает распознавание речи на более чем 99 языках, включая английский, русский, французский и многие другие. Вы можете выбрать нужный язык в настройках перед началом встречи.",
    },
    {
      title: "Есть ли в системе возможность анализа встреч?",
      content:
        "Да, система WorldSpeechAI предоставляет возможность анализа встреч. С помощью встроенных ассистентов можно получить детальный отчёт с ключевыми моментами, основными выводами и другими важными деталями встречи.",
    },
    {
      title: "Как связаться с поддержкой, если возникли вопросы?",
      content:
        "Если у вас возникли вопросы или сложности, вы можете обратиться в службу поддержки через контактную форму на сайте или по электронной почте. Также на сайте доступен раздел с часто задаваемыми вопросами (FAQ).",
    },
  ];

  const { request, loading, error } = useHttp();
  const [smartGPT, setSmartGPT] = useState([]);
  const [allData, setAllData] = useState([]);

  const getSmartGPT = async () => {
    const url = baseAPI + URLS.module;
    try {
      const response = await request(url, "GET");

      setAllData(response);
      setSmartGPT(response[0]);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    getSmartGPT();
  }, []);

  return (
    <div className="questions">
      <div className="section-title">Вопросы</div>
      <div className="questions__block">
        {loading && <Loading />}
        {error && <p>{error}</p>}

        <div className="questions__row">
          <div className="faq__block">
            <Accordion
              allData={allData}
              setSmartGPT={setSmartGPT}
              smartGPT={smartGPT}
            />
          </div>

          {smartGPT?.length !== 0 ? (
            <div className="smartGPT__block">
              <>
                <div className="video__part">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://rutube.ru/play/embed/${
                      smartGPT?.video_url?.split("/")[4] // 4-indeks bo'lib, video_id shu yerda bo'ladi
                    }`}
                    frameBorder="0"
                    allow="clipboard-write; autoplay"
                    webkitAllowFullScreen
                    mozAllowFullScreen
                    allowFullScreen
                  ></iframe>
                </div>

                <h3 className="smart__title">{smartGPT?.title}</h3>

                <p className="descr">{smartGPT?.description}</p>
              </>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Instructions;
