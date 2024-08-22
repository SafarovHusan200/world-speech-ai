"use client";

import React from "react";
import "../styles/tarif.css";
import { useRouter } from "next/navigation";

const TarifCard = () => {
  const router = useRouter();
  const handleTarif = () => {
    router.push("/auth/login");
  };
  return (
    <div className="tarif__items">
      <div className="tarif__item">
        <div className="tarif__item--top__text">Начальный</div>
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
      </div>
    </div>
  );
};

export default TarifCard;
