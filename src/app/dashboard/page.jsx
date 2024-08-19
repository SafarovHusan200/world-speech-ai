"use client";

import React, { useEffect, useState } from "react";

import { URLS } from "@/constants/url";
import { baseAPI } from "@/constants/domain";

import useHttp from "../hooks/useHttp";
import Link from "next/link";
import "../../styles/meetingForm.css";
import DraggerComponent from "@/components/Drag-and-Drop";

import { useDashboard } from "../hooks/context/dashboardContext";
import { useRouter } from "next/navigation";
import { message } from "antd";

// import { Option } from "antd/es/mentions";

const Dashboard = () => {
  const { setUser } = useDashboard();
  const { request, loading, error } = useHttp();
  const url = `${baseAPI + URLS.profile}`;

  const [formData, setFormData] = useState({
    meeting_name: "",
    meeting_type: "Telemost",
    meeting_url: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const getMeData = async () => {
    const res = await request(url, "GET")
      .then((response) => {
        setUser(response);
        return response;
      })
      .catch((err) => {
        return err;
      });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    formDataObj.append("meeting_name", formData.meeting_name);
    formDataObj.append("meeting_type", formData.meeting_type);
    formDataObj.append("meeting_url", formData.meeting_url);
    formDataObj.append("password", formData.password);

    const url = baseAPI + URLS.send_url;

    try {
      const response = await request(url, "POST", formDataObj);

      if (response.status === "Processing") {
        message.success("URL successfully sent");
      }
    } catch (err) {
      message.error("Failed to send URL");
    }
  };

  useEffect(() => {
    getMeData();
  }, []);

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
                  <img src="/camera-icon.svg" alt="camera" />
                </Link>
                <Link href={"#!"}>
                  <img src="/zoom-icon.svg" alt="camera" />
                </Link>
                <Link href={"#!"}>
                  <img src="/meeting-icon.svg" alt="camera" />
                </Link>
              </div>
            </h3>
            <p className="descr">
              Наш бот подключится к вашей встрече и автоматически запишет важный
              разговор, преобразует аудио в текст и подготовит отчет
            </p>
            <form className="form" onSubmit={submitForm}>
              <label>Название</label>
              <input
                type="text"
                name="meeting_name"
                placeholder="Например: Созвон с Ильей по сайту"
                required
                value={formData.name}
                onChange={handleChange}
              />
              <label>Площадка</label>
              <select
                name="meeting_type"
                value={formData.platform}
                onChange={handleChange}
              >
                <option value="Telemost">Telemost</option>
                <option value="Zoom">Zoom</option>
                <option value="Zoom">Yandex</option>
                <option value="Zoom">Google</option>
              </select>

              <label>Ссылка на конференцию</label>
              <input
                type="text"
                name="meeting_url"
                placeholder="Zoom, Google Meet, Telemost"
                autoComplete="current-text"
                required
                value={formData.conferenceLink}
                onChange={handleChange}
              />
              <label>Пароль</label>
              <input
                type="password"
                name="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
              />

              <div className="row row1">
                <Link href={"#!"}>Только для Zoom</Link>
                <span>Если нету, оставьте поле пустым</span>
              </div>
              <div className="row row2">
                <button type="submit" className="btn-primary">
                  Отправить
                </button>
                <div className="links">
                  <Link href={"#!"}>
                    <img src="/camera-icon.svg" alt="camera" />
                  </Link>
                  <Link href={"#!"}>
                    <img src="/zoom-icon.svg" alt="camera" />
                  </Link>
                  <Link href={"#!"}>
                    <img src="/meeting-icon.svg" alt="camera" />
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
