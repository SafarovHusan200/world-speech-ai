"use client";

import React, { useEffect, useState } from "react";
import "../styles/tarif.css";
import { useRouter } from "next/navigation";
import { baseAPI } from "@/constants/domain";
import { URLS } from "@/constants/url";
import axios from "axios";
import Loading from "./Loading";
import useHttp from "@/app/hooks/useHttp";

const TarifCard = () => {
  const { request } = useHttp();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [tarif, setTarif] = useState();

  const getTarif = async () => {
    setLoading(true);
    const url = baseAPI + URLS.tarif;

    const result = await axios
      .get(url)
      .then((response) => {
        setTarif(response.data);
        console.log(response.data);
        return response.data;
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  };

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

  useEffect(() => {
    getTarif();
  }, []);
  return (
    <div className="tarif__items">
      {loading ? <Loading /> : null}
      {tarif &&
        tarif.length > 0 &&
        tarif.map((t) => (
          <div key={t.id} className="tarif__item">
            <div className="tarif__item--top__text">{t.plan_type}</div>
            <div className="tarif__item--name">
              {`${t.price}₽   `}{" "}
              <span>{` ${Math.round(t.price / 12)}₽  в месяц `}</span>
            </div>
            <div className="tarif__item--time">{t.minutes} в год</div>
            <div className="tarif__item--time__month">
              {Math.round(t.minutes / 12)} в месяц
            </div>
            {/* <div className="tarif__item--subscriptions__title">
              Подписка включает в себя:
            </div>
            <ul className="tarif__item--subscriptions">
              <li className="tarif__item--subscription">
                <img src="/round-check.svg" alt="icon" />
                <span>Интеграция с GCalendar</span>
              </li>
              <li className="tarif__item--subscription">
                <img src="/round-check.svg" alt="icon" />
                <span>Расширенный функционал</span>
              </li>
              <li className="tarif__item--subscription">
                <img src="/round-check.svg" alt="icon" />
                <span>Постоянная поддержка</span>
              </li>
              <li className="tarif__item--subscription">
                <img src="/round-check.svg" alt="icon" />
                <span>Крутая скорость обработки</span>
              </li>
              <li className="tarif__item--subscription">
                <img src="/round-check.svg" alt="icon" />
                <span>А дальше я не знаю, что вписать</span>
              </li>
              <li className="tarif__item--subscription">
                <img src="/round-check.svg" alt="icon" />
                <span>Мне не хватает текстов</span>
              </li>
            </ul> */}

            <button
              className="tarif__item--btn btn-outline"
              onClick={() => handleTarif(t.id)}
            >
              Купить
            </button>
          </div>
        ))}

      {/* <div className="tarif__item">
        <div className="tarif__item--top__text orange">Обычная</div>
        <div className="tarif__item--name">Бесплатно</div>
        <div className="tarif__item--time">180 минут</div>
        <div className="tarif__item--subscriptions__title">
          Подписка включает в себя:
        </div>
        <ul className="tarif__item--subscriptions">
          <li className="tarif__item--subscription">
            <img src="/round-check.svg" alt="icon" />
            <span>Интеграция с GCalendar</span>
          </li>
          <li className="tarif__item--subscription">
            <img src="/round-check.svg" alt="icon" />
            <span>Расширенный функционал</span>
          </li>
          <li className="tarif__item--subscription">
            <img src="/round-check.svg" alt="icon" />
            <span>Постоянная поддержка</span>
          </li>
          <li className="tarif__item--subscription">
            <img src="/round-check.svg" alt="icon" />
            <span>Крутая скорость обработки</span>
          </li>
          <li className="tarif__item--subscription">
            <img src="/round-check.svg" alt="icon" />
            <span>А дальше я не знаю, что вписать</span>
          </li>
          <li className="tarif__item--subscription">
            <img src="/round-check.svg" alt="icon" />
            <span>Мне не хватает текстов</span>
          </li>
        </ul>

        <button
          className="tarif__item--btn btn-outline"
          onClick={() => handleTarif()}
        >
          Купить
        </button>
      </div>
      <div className="tarif__item">
        <div className="tarif__item--top__text pro">Про</div>
        <div className="tarif__item--name">Бесплатно</div>
        <div className="tarif__item--time">180 минут</div>
        <div className="tarif__item--subscriptions__title">
          Подписка включает в себя:
        </div>
        <ul className="tarif__item--subscriptions">
          <li className="tarif__item--subscription">
            <img src="/round-check.svg" alt="icon" />
            <span>Интеграция с GCalendar</span>
          </li>
          <li className="tarif__item--subscription">
            <img src="/round-check.svg" alt="icon" />
            <span>Расширенный функционал</span>
          </li>
          <li className="tarif__item--subscription">
            <img src="/round-check.svg" alt="icon" />
            <span>Постоянная поддержка</span>
          </li>
          <li className="tarif__item--subscription">
            <img src="/round-check.svg" alt="icon" />
            <span>Крутая скорость обработки</span>
          </li>
          <li className="tarif__item--subscription">
            <img src="/round-check.svg" alt="icon" />
            <span>А дальше я не знаю, что вписать</span>
          </li>
          <li className="tarif__item--subscription">
            <img src="/round-check.svg" alt="icon" />
            <span>Мне не хватает текстов</span>
          </li>
        </ul>

        <button
          className="tarif__item--btn btn-outline"
          onClick={() => handleTarif()}
        >
          Купить
        </button>
      </div>
      <div className="tarif__item">
        <div className="tarif__item--top__text ultra">Ультра</div>
        <div className="tarif__item--name">Бесплатно</div>
        <div className="tarif__item--time">180 минут</div>
        <div className="tarif__item--subscriptions__title">
          Подписка включает в себя:
        </div>
        <ul className="tarif__item--subscriptions">
          <li className="tarif__item--subscription">
            <img src="/round-check.svg" alt="icon" />
            <span>Интеграция с GCalendar</span>
          </li>
          <li className="tarif__item--subscription">
            <img src="/round-check.svg" alt="icon" />
            <span>Расширенный функционал</span>
          </li>
          <li className="tarif__item--subscription">
            <img src="/round-check.svg" alt="icon" />
            <span>Постоянная поддержка</span>
          </li>
          <li className="tarif__item--subscription">
            <img src="/round-check.svg" alt="icon" />
            <span>Крутая скорость обработки</span>
          </li>
          <li className="tarif__item--subscription">
            <img src="/round-check.svg" alt="icon" />
            <span>А дальше я не знаю, что вписать</span>
          </li>
          <li className="tarif__item--subscription">
            <img src="/round-check.svg" alt="icon" />
            <span>Мне не хватает текстов</span>
          </li>
        </ul>

        <button
          className="tarif__item--btn btn-outline"
          onClick={() => handleTarif()}
        >
          Купить
        </button>
      </div> */}
    </div>
  );
};

export default TarifCard;
