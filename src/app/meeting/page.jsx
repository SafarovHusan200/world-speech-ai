import Link from "next/link";
import React from "react";
import "../../styles/meeting.css";
import MeetingCard from "@/components/MeetingCard";

const Meeting = () => {
  return (
    <div className="meeting">
      <div className="container">
        <p className="successfully-register">Успешная регистрация!</p>
        <div className="title">
          Вести онлайн-встречи с <br /> WorldspeechAI проще простого
        </div>

        <div className="cards">
          <div className="card">
            <div className="card__number">1</div>
            <div className="card__icon">
              <img className="img3ta" src="/camera-icon.svg" alt="icon" />
              <img className="img3ta" src="/zoom-icon.svg" alt="icon" />
              <img className="img3ta" src="/meeting-icon.svg" alt="icon" />
              <img
                className="img3ta hidden"
                src="/cloud-upload.svg"
                alt="icon"
              />
            </div>
            <div className="card__name">
              Пригласите нашего бота на конференцию
            </div>
            <div className="card__descr">
              Поддержка Zoom, Google Meet и <br /> Telemost
            </div>
          </div>

          <p className="or">или</p>
          <MeetingCard
            // number={1}
            img={["/cloud-upload.svg"]} 
            name={" Загрузите запись встречи"}
            description={"Поддерживаем аудио и видео форматы"}
          />
          <MeetingCard
            number={2}
            img={["/clipboard-check.svg"]}
            name={"Получите готовый отчет"}
            description={"Транскрипт с таймкодами, резюме встречи и задачи"}
          />
          <MeetingCard
            number={3}
            img={["/calendar.svg"]}
            name={"Интеграция с Google Calendar"}
            description={"Отслеживайте, когда проходят встречи"}
          />
        </div>

        <div className="btns">
          <Link href={"/feature"} className="btn btn-primary">
            Приступить
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Meeting;
