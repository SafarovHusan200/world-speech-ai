"use client";

import TarifCard from "@/components/TarifCard";
import React, { useEffect, useState } from "react";
import "../../../styles/dashboard-tarif.css";
import useHttp from "@/app/hooks/useHttp";
import { baseAPI } from "@/constants/domain";
import { URLS } from "@/constants/url";
import axios from "axios";

const Tarif = () => {
  const [tarif, setTarif] = useState(null);
  const { request, error } = useHttp();
  const [discount, setDiscount] = useState(true);

  const [loading, setLoading] = useState(true);

  const handleCheked = () => {
    setDiscount((prevDiscount) => !prevDiscount); // discountni o'zgartirish
  };

  useEffect(() => {
    const getTarif = async () => {
      setLoading(true);

      const url = discount ? URLS.tarif__yearly : URLS.tarif__monthly;

      try {
        const response = await axios.get(baseAPI + url);
        setTarif(response.data);
        console.log(response.data);
      } catch (err) {
        console.log("Error fetching data: ", err);
      }

      setLoading(false);
    };

    getTarif();
  }, [discount]);
  return (
    <div className="dashboard__tarif">
      <div className="section-title">Тарифы</div>
      <p className="description">
        Искусственный интеллект, который подключится к звонку, запишет встречу,
        расскажет об итогах, даст точную транскрибацию встречи и зафиксирует
        задачи
      </p>
      <div className="section-actions">
        <div className="monthly">Ежемесячно</div>
        <input
          type="checkbox"
          name="monthly"
          id="monthly"
          checked={!discount}
          onChange={handleCheked}
        />
        <label htmlFor="monthly" className="monthly__label">
          <span></span>
        </label>
        <div className="annual">Годовая</div>
        <span>-15%</span>
      </div>

      <div className="tarif__items">
        {/* {tarif &&
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
          ))} */}

        <TarifCard tarif={tarif} loading={loading} discount={discount} />
      </div>

      {!tarif && tarif?.length === 0 && <TarifCard />}
    </div>
  );
};

export default Tarif;
