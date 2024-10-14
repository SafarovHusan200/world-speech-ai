import { Button, Modal } from "antd";
import { useState } from "react";
import "../styles/modal.css";

const MyModal = ({ isModalVisible, setIsModalVisible }) => {
  const handleOk = () => {
    console.log("OK button clicked");
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    console.log("Cancel button clicked");
    setIsModalVisible(false);
  };

  return (
    <>
      <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <h2 className="section-title">Компания XYZ</h2>

        <div className="modal__block__component">
          <div className="top">
            <div className="icon">
              <img src="/!.svg" alt="icon" />
            </div>
            <h4>Проблема</h4>
          </div>
          <p>
            Сотрудники компании XYZ столкнулись с трудностями в управлении
            большим количеством встреч. Много времени уходило на ручную
            расшифровку аудиозаписей, создание отчетов и постановку задач. Это
            замедляло процессы принятия решений и тормозило выполнение проектов.
          </p>
        </div>

        <div className="modal__block__component">
          <div className="top">
            <div className="icon">
              <img src="/check__icon.svg" alt="icon" />
            </div>
            <h4>Решение с Wordspeech</h4>
          </div>
          <p>
            Компания XYZ внедрила Wordspeech для автоматизации процесса записи и
            расшифровки встреч. Продукт был интегрирован с Google Calendar, что
            позволило автоматически подключаться ко всем запланированным
            встречам и создавать точные транскрипты в реальном времени.
          </p>
        </div>

        <div className="cards">
          <div className="card">
            <h5 className="card--title">Экономия времени</h5>
            <p className="card--descr">
              Расшифровка встреч теперь занимает минуты, сократив время на
              отчёты и задачи на 30%, что в итоге сэкономило около 15 часов
              еженедельно.
            </p>
          </div>

          <div className="card">
            <h5 className="card--title">Улучшение коммуникации</h5>
            <p className="card--descr">
              Участники получают точные транскрипты и задачи сразу после
              встречи, что ускорило выполнение проектов на 20%.
            </p>
          </div>
          <div className="card">
            <h5 className="card--title">Повышение безопасности </h5>
            <p className="card--descr">
              Конфиденциальная информация надёжно защищена передовыми методами
              шифрования, снизив риск утечек данных на 40%.
            </p>
          </div>
          <div className="card">
            <h5 className="card--title">Снижение ошибок </h5>
            <p className="card--descr">
              Автоматическая транскрипция минимизировала риск ошибок на 25%.
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default MyModal;
