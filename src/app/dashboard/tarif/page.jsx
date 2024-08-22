"use client";

import TarifCard from "@/components/TarifCard";
import React, { useEffect, useState } from "react";
import "../../../styles/dashboard-tarif.css";
import useHttp from "@/app/hooks/useHttp";
import { baseAPI } from "@/constants/domain";
import { URLS } from "@/constants/url";

const Tarif = () => {
  const [tarif, setTarif] = useState(null);
  const { request, loading, error } = useHttp();

  const getTarif = async () => {
    const url = baseAPI + URLS.tarif;
    request(url, "GET")
      .then((response) => {
        console.log(response);
        setTarif(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePerchase = (id) => {
    const url = baseAPI + URLS.purchases_create;
    try {
      request(url, "POST", { plan: id })
        .then((response) => {
          console.log(response);
          window.location.href = response.payment_url;
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getTarif();
  }, []);
  return (
    <div className="dashboard__tarif">
      <div className="section-title">Тарифы</div>

      <div className="section-actions">
        <div className="monthly">Ежемесячно</div>
        <input type="checkbox" name="monthly" id="monthly" />
        <label htmlFor="monthly" className="monthly__label">
          <span></span>
        </label>
        <div className="annual">Годовая</div>
        <span>-15%</span>
      </div>

      <div className="tarif__items">
        {tarif &&
          tarif?.length > 0 &&
          tarif?.map((t) => (
            <div key={t.id} className="tarif__item">
              <div className="tarif__item--top__text">Начальный</div>
              <div className="tarif__item--name">{t.price} ₽</div>
              <div className="tarif__item--time">{t.minutes} минут</div>
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
                onClick={() => handlePerchase(t.id)}
              >
                Купить
              </button>
            </div>
          ))}
      </div>

      {!tarif && tarif?.length === 0 && <TarifCard />}
    </div>
  );
};

export default Tarif;
