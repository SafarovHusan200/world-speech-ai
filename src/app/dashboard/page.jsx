"use client";

import React, { useEffect, useState } from "react";
import { URLS } from "@/constants/url";
import { baseAPI } from "@/constants/domain";
import useHttp from "../hooks/useHttp";
import Link from "next/link";
import "../../styles/meetingForm.css";
import DraggerComponent from "@/components/Drag-and-Drop";
import { useDashboard } from "../hooks/context/dashboardContext";
import { message } from "antd";

const Dashboard = () => {
  const { setUser } = useDashboard();
  const { request, loading, error } = useHttp();
  const url = `${baseAPI + URLS.profile}`;

  const [formData, setFormData] = useState({
    meeting_name: "",
    meeting_type: "yandex",
    meeting_url: "",
    password: "",

    bitrix_chat_url: "",
    bitrix_lead_name: "",
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
    formDataObj.append("bitrix_chat_url", formData.bitrix_chat_url);
    formDataObj.append("bitrix_lead_name", formData.bitrix_lead_name);

    const url = baseAPI + URLS.send_url;

    try {
      const response = await request(url, "POST", formDataObj);

      if (response.status === "Processing") {
        message.success("URL successfully sent");
      }
    } catch (err) {
      message.error(err[0] || "Failed to send URL");
    }
  };

  const sendAudioFile = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await request(
        "https://worldspeechai.com/api/v1/upload/",
        "POST",
        formData,
        {
          "Content-Type": "multipart/form-data",
        }
      );

      if (response.status == "Processing") {
        message.success(`${file.name} file uploaded successfully.`);
      }
    } catch (error) {
      message.error(
        error.response?.data?.error ||
          error.response?.data?.code ||
          error ||
          "An error occurred"
      );
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      sendAudioFile(selectedFile);
    }
  };

  useEffect(() => {
    getMeData();
  }, []);

  return (
    <>
      <h2 className="section-title main">Новая встреча</h2>

      <div className="dashbord__content">
        <div className="dashbord__content--left">
          <div className="dashbord__content--left__description">
            <b>Загрузить аудио/видео файл встречи</b>
            <p className="date">
              Обработка займет от 5 до 10 минут, и отчет будет доступен в списке
              ваших встреч
            </p>
          </div>
          {/* ============ */}

          <DraggerComponent />

          {/* ============= */}

          <div className="mobile-content">
            <p className="file__type">
              Аудиоформаты: MP3, MP4, OGG, WAV, WMA, M4A
            </p>
            <label htmlFor="file" className="btn btn-outline">
              Загрузить файлы
              <input
                type="file"
                id="file"
                onChange={handleFileChange}
                className="file-upload-mobile"
              />
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
                Наш бот подключится к вашей встрече и автоматически запишет
                важный разговор, преобразует аудио в текст и подготовит отчет
              </p>
              <form className="form" onSubmit={submitForm}>
                <label htmlFor="name">Название</label>
                <input
                  id="name"
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
                  <option value="yandex">Yandex</option>
                  <option value="zoom">Zoom</option>
                  <option value="google">Google Meet</option>
                </select>

                <label>Ссылка на конференцию</label>
                <input
                  type="url"
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
                  value={formData.password}
                  onChange={handleChange}
                />

                <div className="row row1">
                  <Link href={"#!"}>Только для Zoom</Link>
                  <span>Если пароль отсутствует, оставьте это поле пустым</span>
                </div>

                <div className="row row__bitrix">
                  <input
                    type="url"
                    className="bitrix"
                    name="bitrix"
                    placeholder="Ссылка на групповой чат Bitrix 24"
                    value={formData.bitrix_chat_url}
                    onChange={handleChange}
                  />
                  <div className="information">
                    <div className="information__head">i</div>
                    <div className="information__body">
                      Проведет анализ встречи, поставит задачи и подготовит
                      отчет. Выберите встречу в таблице или воспользуйтесь
                      поиском, выберите тип ассистента и получите готовый
                      результат
                    </div>
                  </div>
                </div>

                <div className="row row__bitrix">
                  <input
                    type="text"
                    placeholder="Имя лида"
                    className="lida"
                    name="name"
                    value={formData.bitrix_lead_name}
                    onChange={handleChange}
                  />
                  <div className="information">
                    <div className="information__head">i</div>
                    <div className="information__body">
                      Проведет анализ встречи, поставит задачи и подготовит
                      отчет. Выберите встречу в таблице или воспользуйтесь
                      поиском, выберите тип ассистента и получите готовый
                      результат
                    </div>
                  </div>
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
    </>
  );
};

export default Dashboard;
