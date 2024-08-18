"use client";

import React, { useEffect } from "react";
import MeetingForm from "@/components/MeetingForm";
import { useSession } from "next-auth/react";
import { URLS } from "@/constants/url";
import { baseAPI } from "@/constants/domain";
import { useQuery } from "@tanstack/react-query";
import useHttp from "../hooks/useHttp";
import Link from "next/link";
import "../../styles/meetingForm.css";
import DraggerComponent from "@/components/Drag-and-Drop";

const Dashboard = () => {
  const { request, loading, error } = useHttp();
  const { data: session, status } = useSession();
  const url = `${baseAPI + URLS.profile}`;
  console.log(url);

  const { data, isLoading, isError } = useQuery({
    queryFn: () => request(url, "GET"),
    queryKey: ["movies"],
    enabled: !!session, // Only run the query if the session exists
  });

  console.log(data);
  return (
    <div className="dashbord__content">
      <div className="dashbord__content--left">
        <h2 className="section-title">Новая встреча</h2>
        <div className="dashbord__content--left__description">
          <b>Загрузить аудио/видео файл встречи</b>
          <p className="date">
            Обработка займет от 5 до 10 минут, и отчет будет доступен в списке
            ваших встреч
          </p>
        </div>
        <div className="upload-section">
          {/* ============ */}

          <DraggerComponent />
          {/* ============= */}
        </div>

        <div className="mobile-content">
          <p className="file__type">
            Аудиоформаты: MP3, M4A, OGG, WAV, WMA, M4A
          </p>
          <label htmlFor="file" className="btn btn-outline">
            Загрузить файлы
          </label>
        </div>
      </div>
      <div className="dashbord__content--right">
        <div className="meeting-form">
          <div className="conference-section">
            <h3>
              Отправить бота на конференцию
              <div className="links">
                <Link href={"#!"}>
                  <img src="camera-icon.svg" alt="camera" />
                </Link>
                <Link href={"#!"}>
                  <img src="zoom-icon.svg" alt="camera" />
                </Link>
                <Link href={"#!"}>
                  <img src="meeting-icon.svg" alt="camera" />
                </Link>
              </div>
            </h3>
            <p className="descr">
              Наш бот подключится к вашей встрече и автоматически запишет важный
              разговор, преобразует аудио в текст и подготовит отчет
            </p>
            <form className="form">
              <label>Название</label>
              <input
                type="text"
                placeholder="Например: Созвон с Ильей по сайту"
              />
              <label>Площадка</label>
              <select>
                <option>Telemost</option>
              </select>
              <label>Ссылка на конференцию</label>
              <input
                type="text"
                placeholder="Zoom, Google Meet, Telemost"
                autocomplete="current-text"
              />
              <label>Пароль</label>
              <input
                type="password"
                placeholder="Только для Zoom"
                autocomplete="current-password"
              />

              <div className="row row1">
                <Link href={"#!"}>Только для Zoom</Link>

                <span>Если нету, оставьте поле пустым</span>
              </div>
              <div className="row row2">
                <button className="btn-primary">Отправить</button>
                <div className="links">
                  <Link href={"#!"}>
                    <img src="camera-icon.svg" alt="camera" />
                  </Link>
                  <Link href={"#!"}>
                    <img src="zoom-icon.svg" alt="camera" />
                  </Link>
                  <Link href={"#!"}>
                    <img src="meeting-icon.svg" alt="camera" />
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
