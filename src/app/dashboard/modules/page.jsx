"use client";

import React, { useEffect, useState } from "react";
import TranscriptionTable from "@/components/TranscriptionTable";
import "../../../styles/module.css";
import useHttp from "@/app/hooks/useHttp";
import { baseAPI } from "@/constants/domain";
import Loading from "@/components/Loading";
import { message } from "antd";
import { URLS } from "@/constants/url";

const Modules = () => {
  return (
    <div className="modul">
      <div className="section-title">Модули</div>
      <div className="modul__block">
        <div className="card">
          <div className="bottom__content">
            <h4>SmartGPT</h4>
            <p>
              Собственный ИИ на серверах в РФ. Ответит на вопросы, поможет с
              текстом
            </p>
          </div>
        </div>
        <div className="card">
          <div className="bottom__content">
            <h4>Личный ассистент</h4>
            <p>
              Создайте ИИ-асситента, который запланирует встречу и поставит
              задачи
            </p>
          </div>
        </div>
        <div className="card">
          <div className="social__media">
            <a href="#">
              <img src="/callIcon.svg" alt="camera" />
            </a>
            <a href="#">
              <img src="/camera-icon.svg" alt="camera" />
            </a>
            <a href="#">
              <img src="/zoom-icon.svg" alt="svg" />
            </a>
            <a href="#">
              <img src="/meeting-icon.svg" alt="svg" />
            </a>
          </div>

          <div className="bottom__content">
            <h4> Анализ эмоций</h4>
            <p>Оценка и анализ эмоционального состояния сотрудников</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modules;
