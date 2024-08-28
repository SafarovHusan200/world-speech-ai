"use client";
// src/components/Sidebar.js
import React, { useEffect, useState } from "react";
import "../styles/sidebar.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDashboard } from "@/app/hooks/context/dashboardContext";

import { message } from "antd";
import useHttp from "@/app/hooks/useHttp";
import { baseAPI } from "@/constants/domain";
import { URLS } from "@/constants/url";

const Sidebar = ({ sidebar, handleScroll }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [workTime, setWorkTime] = useState({
    initial_minutes: 300,
    initial_meetings: 9,
    total_minutes: 0,
    total_meetings: 0,
  });
  const { request } = useHttp();
  const { user } = useDashboard();

  const pathname = usePathname();
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const menuData = [
    {
      name: "Главная",
      url: "/dashboard",
    },
    {
      name: "Мои транскрипции",
      url: "/dashboard/my-transcriptions",
    },
    {
      name: "Тарифы",
      url: "/dashboard/tarif",
    },
    {
      name: "Настройки",
      url: "/dashboard/settings",
    },
  ];

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

  const handleTime = async () => {
    const url = baseAPI + URLS.statistic;
    request(url, "GET")
      .then((response) => {
        setWorkTime(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    handleTime();
  }, []);

  return (
    <div className="sidebar" style={{ left: sidebar ? "0" : "-250px" }}>
      <div className="sidebar__top">
        <div className="logo">
          <img src="/logo-full-icon.svg" alt="logo" />
        </div>
        <div className="dropdown">
          <button className="btn-primary" onClick={toggleDropdown}>
            Начать встречу
            <img src={dropdownOpen ? "/down.svg" : "/up.svg"} alt="icon" />
          </button>
          {dropdownOpen && (
            <div className="dropdown-content">
              <div className="dropdown-content-item">
                <img src="/cloud-upload.svg" alt="svg" />

                <label htmlFor="transcription__upload">Загрузить файлы</label>
                <input
                  type="file"
                  id="transcription__upload"
                  onChange={handleFileChange}
                />
              </div>
              <div className="dropdown-content-item">
                <img src="/meeting-icon.svg" alt="camera" />
                <a href="https://meet.google.com/landing">Google Meet</a>
              </div>
              <div className="dropdown-content-item">
                <img src="/zoom-icon.svg" alt="camera" />
                <a href="https://zoom.us/">Zoom</a>
              </div>
              <div className="dropdown-content-item">
                <img src="/camera-icon.svg" alt="" />
                <a href="https://telemost.yandex.ru/">Telemost</a>
              </div>
            </div>
          )}
        </div>
        <ul>
          {menuData.map((menu, i) => (
            <li key={i} onClick={() => handleScroll()}>
              <Link
                className={pathname === menu.url ? "active" : ""}
                href={menu.url}
              >
                {menu.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar__bottom">
        <div className="row">
          <p>Осталось встреч</p>
          <span>
            {workTime.total_meetings} из {workTime.initial_meetings}
          </span>
        </div>
        <div className="progress-bar">
          <div
            className="progress"
            style={{
              width: `${
                (workTime.total_minutes * 100) / workTime.initial_minutes
              }%`,
            }}
          ></div>
        </div>

        <div className="row">
          <p>Осталось минут</p>
          <span>
            {workTime.total_minutes} из {workTime.initial_minutes}
          </span>
        </div>
        <div className="progress-bar">
          <div
            className="progress"
            style={{
              width: `${
                (workTime.total_minutes * 100) / workTime.initial_minutes
              }%`,
            }}
          ></div>
        </div>
        <Link href={"/dashboard/tarif"} className="btn btn-outline">
          Расширить тариф
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
