import React from "react";
import "../styles/advantages.css";

const Advantages = () => {
  return (
    <div className="advantages">
      <div className="container">
        <div className="section-title">Преимущества</div>
        <div className="advantages-grid">
          <div className="advantage-item">
            <img src="/advantage__icon1.svg" alt="icon" />
            <div className="advantage__col">
              <h3>Автоматическая запись встреч</h3>
              <p>
                Бот подключается ко всем вашим встречам и создает точные
                транскрипты
              </p>
            </div>
          </div>
          <div className="advantage-item">
            <img src="/advantage__icon5.svg" alt="icon" />
            <div className="advantage__col">
              <h3>Соблюдаем 152- ФЗ</h3>

              <p>Выполнение требований к защите личной информации граждан</p>
            </div>
          </div>
          <div className="advantage-item">
            <img src="/advantage__icon2.svg" alt="icon" />
            <div className="advantage__col">
              <h3>Транскрибация на 99 языках</h3>
              <p>Поддержка множества языков для глобального использования</p>
            </div>
          </div>
          <div className="advantage-item">
            <img src="/advantage__icon6.svg" alt="icon" />
            <div className="advantage__col">
              <h3>Интеграция с Google Calendar</h3>
              <p>Автоматическое подключение ко всем запланированным встречам</p>
            </div>
          </div>
          <div className="advantage-item">
            <img src="/advantage__icon3.svg" alt="icon" />
            <div className="advantage__col">
              <h3>Управление задачами</h3>
              <p>
                Транскрипты дополняются краткими описаниями и задачами для
                удобства
              </p>
            </div>
          </div>
          <div className="advantage-item">
            <img src="/advantage__icon7.svg" alt="icon" />
            <div className="advantage__col">
              <h3>Простой интерфейс</h3>
              <p>Интуитивно понятный и удобный в использовании</p>
            </div>
          </div>
          <div className="advantage-item">
            <img src="/advantage__icon4.svg" alt="icon" />
            <div className="advantage__col">
              <h3>Высокий уровень безопасности</h3>
              <p>
                Передовые технологии шифрования и строгие протоколы защиты
                данных
              </p>
            </div>
          </div>
          <div className="advantage-item">
            <img src="/advantage__icon8.svg" alt="icon" />
            <div className="advantage__col">
              <h3>Конфиденциальность</h3>
              <p>Данные не передаются третьим лицам без вашего согласия</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Advantages;
