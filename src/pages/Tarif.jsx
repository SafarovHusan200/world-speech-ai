import React from "react";
import "/src/styles/tarif.css";
import TarifCard from "@/components/TarifCard";

const Tarif = () => {
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
          <input type="checkbox" name="monthly" id="monthly" />
          <label htmlFor="monthly" className="monthly__label">
            <span></span>
          </label>
          <div className="annual">Годовая</div>
          <span>-15%</span>
        </div>

        {/* Section items */}

        <TarifCard />

        {/* Section cards */}
        <div className="tarif__section--cards">
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
        </div>
      </div>
    </section>
  );
};

export default Tarif;
