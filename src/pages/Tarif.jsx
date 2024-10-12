"use client";

import React, { useEffect, useState } from "react";
import "/src/styles/tarif.css";
import TarifCard from "@/components/TarifCard";
import axios from "axios";
import { baseAPI } from "@/constants/domain";
import { URLS } from "@/constants/url";

const Tarif = () => {
  const [tarif, setTarif] = useState();
  const [discount, setDiscount] = useState(true);
  const [loading, setLoading] = useState(true);

  const handleCheked = () => {
    setDiscount((prevDiscount) => !prevDiscount); // discountni o'zgartirish

    const newTarif = tarif.map((t) => {
      const discountValue = 1.15; // 15% ga teng
      if (discount) {
        // Agar chegirma mavjud bo'lsa, narxni kamaytirish
        return { ...t, price: Math.round(t.price * discountValue) };
      } else {
        // Agar chegirma olinmasa, narxni tiklash
        return { ...t, price: Math.round(t.price / discountValue) };
      }
    });

    setTarif(newTarif); // Yangilangan tariflar bilan setTarif
  };

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

  useEffect(() => {
    getTarif();
  }, []);
  return (
    <section className="tarif" id="tarif">
      <div className="container">
        <div className="section-title">Тарифы</div>
        <div className="section-descr">
          Искусственный интеллект, который подключится к звонку, запишет
          встречу, расскажет об итогах, даст точную транскрибацию встречи и
          зафиксирует задачи
        </div>

        <div className="section-actions">
          <div className="monthly">Ежемесячно</div>
          <input
            type="checkbox"
            name="monthly"
            id="monthly"
            checked={discount}
            onChange={handleCheked}
          />
          <label htmlFor="monthly" className="monthly__label">
            <span></span>
          </label>
          <div className="annual">Годовая</div>
          <span>-15%</span>
        </div>

        {/* Section items */}

        <TarifCard tarif={tarif} loading={loading} />

        <div className="tarif__bottom">
          <div className="tarif__bottom__col tarif__bottom__col-1">
            <small>Корпоративный</small>
            <h4>Индивидуальные условия и использование собственного сервера</h4>

            <ul className="tarif__bottom__col--item">
              <li className="tarif__item--subscription">
                <img src="/checked__light.svg" alt="icon" />
                <span>Гибкая система скидок</span>
              </li>
              <li className="tarif__item--subscription">
                <img src="/checked__light.svg" alt="icon" />
                <span>
                  Возможность использования API для автоматизации процессов
                </span>
              </li>
              <li className="tarif__item--subscription">
                <img src="/checked__light.svg" alt="icon" />
                <span>
                  Круглосуточная поддержка и возможность интеграции с другими
                  корпоративными системами
                </span>
              </li>
            </ul>

            <button className="btn btn-outline">Купить</button>
          </div>
          <div className="tarif__bottom__col tarif__bottom__col-2">
            <small>Включено во всех тарифы</small>

            <h4>Дополнительные функции</h4>

            <div className="btns">
              <button className="btn btn-outline">
                Интеграция с Google Calendar
              </button>
              <button className="btn btn-outline">Автоматический обмен</button>
              <button className="btn btn-outline">AI-резюме и задачи</button>
              <button className="btn btn-outline">
                Круглосуточная поддержка
              </button>
              <button className="btn btn-outline">
                Интеграция с Zoom, Яндекс.Телемост и Google Meet
              </button>
              <button className="btn btn-outline">
                Неограниченное хранилище
              </button>
              <button className="btn btn-outline">Экспорт в PDF, DOCX</button>
            </div>
          </div>
        </div>

        {/* Section cards */}
        {/* <div className="tarif__section--cards">
          <div className="tarif__section--card">
            <div className="tarif__section--card__left">
              <div className="tarif__section--card__left--title">
                Теперь нет необходимости вести записи встреч
              </div>
              <div className="tarif__section--card__left--descr">
                Наш бот подключится к вашей встрече и автоматически сделает
                запись. Все ваши встречи будут сохранены в виде транскриптов с
                задачами и кратким описанием в удобном интерфейсе
              </div>
            </div>
            <div className="tarif__section--card__right">
              <img
                className="tarif__section--card__icon microphone "
                src="/microphone-full.svg"
                alt="microphone"
              />
            </div>
          </div>
          <div className="tarif__section--card">
            <div className="tarif__section--card__left">
              <div className="tarif__section--card__left--title">
                Работает с календарем
              </div>
              <div className="tarif__section--card__left--descr">
                Подключите ваш Google Calendar, чтобы мы автоматически
                присоединялись ко всем вашим встречам.
              </div>
            </div>
            <div className="tarif__section--card__right">
              <img
                className="tarif__section--card__icon calendar"
                src="/meeting.svg"
                alt="microphone"
              />
            </div>
          </div>
          <div className="tarif__section--card">
            <div className="tarif__section--card__left">
              <div className="tarif__section--card__left--title">
                Все просто
              </div>
              <div className="tarif__section--card__left--descr">
                Наш сервис прост в использовании и одновременно обладает
                множеством полезных функций для эффективного управления
                расписанием и задачами.
              </div>
            </div>
            <div className="tarif__section--card__right">
              <img
                className="tarif__section--card__icon settings"
                src="/settings.svg"
                alt="microphone"
              />
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default Tarif;
