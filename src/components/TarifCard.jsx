"use client";

import React, { useEffect, useState } from "react";
import "../styles/tarif.css";
import { useRouter } from "next/navigation";
import { baseAPI } from "@/constants/domain";
import { URLS } from "@/constants/url";

import Loading from "./Loading";
import useHttp from "@/app/hooks/useHttp";

const TarifCard = ({ tarif, loading, discount }) => {
  const { request } = useHttp();
  const router = useRouter();

  const handleTarif = (id) => {
    const login = JSON.parse(localStorage.getItem("isLogin"));

    if (login) {
      const url = baseAPI + URLS.purchases_create;
      request(url, "POST", { plan: id }).then((res) => {
        window.location.href = res.payment_url;
      });
    } else {
      router.push("/auth/login");
    }
  };

  return (
    <div className="tarif__items">
      {tarif && tarif.length > 0 && !loading ? (
        tarif.map((t) => (
          <div key={t.id} className="tarif__item">
            <div className="position__type">
              <span></span>
              <h4>{t.name}</h4>
            </div>
            <div className="tarif__item--top__year">
              {t.max_meetings_per_month} встреч в {discount ? "год" : "месяц"}
            </div>

            <div className="tarif__item--top__text">
              {discount && (
                <>
                  ({Math.round(t.max_meetings_per_month / 12)} встреч в месяц)
                </>
              )}
            </div>

            <div className="tarif__item--top__year">
              {t.prompts} запросов в {discount ? "год" : "месяц"}
            </div>

            <div className="tarif__item--top__text">
              {discount && <>({Math.round(t.prompts / 12)} встреч в месяц)</>}
            </div>

            <div className="tarif__item--top__year">
              {t.minutes} минут в {discount ? "год" : "месяц"}
            </div>

            <div className="tarif__item--top__text">
              {discount && <>({Math.round(t.minutes / 12)} минут в месяц)</>}
            </div>

            <div className="tarif__item--name">
              <h3> {`${t.price}₽   `} </h3>
              {discount && (
                <span>{` ${Math.round(t.price / 12)}₽  в месяц `}</span>
              )}
            </div>
            {/* <div className="tarif__item--time">{t.minutes} в год</div>
            <div className="tarif__item--time__month">
              {Math.round(t.minutes / 12)} в месяц
            </div> */}
            {/* <div className="tarif__item--subscriptions__title">
              Подписка включает в себя:
            </div> */}
            <ul className="tarif__item--subscriptions">
              <li className="tarif__item--subscription">
                <img src="/check__icon__blue.svg" alt="icon" />
                <span>Интеграция с Яндекс, Телемост, Zoom и Google Meet</span>
              </li>
              <li className="tarif__item--subscription">
                <img src="/check__icon__blue.svg" alt="icon" />
                <span>Интеграция с Google Calendar</span>
              </li>
              <li className="tarif__item--subscription">
                <img src="/check__icon__blue.svg" alt="icon" />
                <span>AI-резюме и задачи</span>
              </li>
              <li className="tarif__item--subscription">
                <img src="/check__icon__blue.svg" alt="icon" />
                <span>Неограниченное хранилище</span>
              </li>
              <li className="tarif__item--subscription">
                <img src="/check__icon__blue.svg" alt="icon" />
                <span>Автоматический обмен</span>
              </li>
              <li className="tarif__item--subscription">
                <img src="/check__icon__blue.svg" alt="icon" />
                <span>Экспорт в PDF, DOCX, TXT.</span>
              </li>
              <li className="tarif__item--subscription">
                <img src="/check__icon__blue.svg" alt="icon" />
                <span>Круглосуточная поддержка</span>
              </li>
            </ul>

            <button
              className="tarif__item--btn btn-outline"
              onClick={() => handleTarif(t.id)}
            >
              Купить
            </button>
          </div>
        ))
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default TarifCard;
