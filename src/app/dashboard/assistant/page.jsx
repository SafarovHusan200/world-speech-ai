"use client";

import React, { useEffect, useState } from "react";
import "../../../styles/assistant.css";
import useHttp from "@/app/hooks/useHttp";
import { baseAPI } from "@/constants/domain";
import Loading from "@/components/Loading";

import { URLS } from "@/constants/url";
import moment from "moment";

const Asistant = () => {
  const { request, loading, error } = useHttp();
  const [asistant, setAsistants] = useState([]);
  const [search, setSearch] = useState("");
  const [assistantType, setAssistantType] = useState("");
  const [timing, setTiming] = useState({ hours: "00", minutes: "00" });
  const [chatLink, setChatLink] = useState("");
  const [leadName, setLeadName] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      search,
      assistantType,
      timing,
      chatLink,
      leadName,
    });
  };

  const data = [
    {
      id: 1,
      title: "Lorem Ipsum",
      date: "12.03.24",
      analysisType: "Анализ встречи и постановка задач",
      status: "В обработке",
    },
    {
      id: 2,
      title: "Lorem Ipsum",
      date: "12.03.24",
      analysisType: "Анализ встречи и постановка задач",
      status: "В обработке",
    },
    // Ko'proq ma'lumotlar qo'shish...
  ];

  const getAsistant = async () => {
    const url = baseAPI + URLS.asistants;
    try {
      const response = await request(url, "GET");

      setAsistants(response);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    getAsistant();
  }, []);

  return (
    <div className="assistant">
      <div className="section-title">
        Ассистент <img src="/i.svg" alt="" />
      </div>
      <div className="asistant__block">
        {loading && <Loading />}
        {error && <p>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="search__row">
            <div className="ant-form-item">
              <label htmlFor="name">
                <img src="/searchIcon.svg" alt="icon" />
              </label>
              <input
                id="name"
                type="text"
                placeholder={"Например: Встреча с Анастасом"}
                name="name"
              />
            </div>
            <div className="ant-form-item">
              <label htmlFor="tip">
                <img src="/robot.svg" alt="icon" />
              </label>
              <input type="text" id="tip" placeholder={"Тип ассистента"} />
            </div>
          </div>

          <div className="search">
            <label className="timer__label">Тайминг в мин</label>
            <div className="search__row">
              <input
                type="number"
                className="hour"
                placeholder="00"
                value={timing.hours}
                onChange={(e) =>
                  setTiming({ ...timing, hours: Number(e.target.value) })
                }
              />

              <input
                type="number"
                placeholder="00"
                className="minut"
                value={timing.minutes}
                onChange={(e) =>
                  setTiming({ ...timing, minutes: Number(e.target.value) })
                }
              />
              <input
                type="text"
                className="bitrix"
                placeholder="Ссылка на групповой чат Bitrix 24"
                value={chatLink}
                onChange={(e) => setChatLink(e.target.value)}
              />
              <div className="information">
                <div className="information__head">i</div>
                <div className="information__body">
                  Проведет анализ встречи, поставит задачи и подготовит отчет.
                  Выберите встречу в таблице или воспользуйтесь поиском,
                  выберите тип ассистента и получите готовый результат
                </div>
              </div>
              <input
                type="text"
                placeholder="Имя лида"
                className="lida"
                value={leadName}
                onChange={(e) => setLeadName(e.target.value)}
              />
              <div className="information">
                <div className="information__head">i</div>
                <div className="information__body">
                  Проведет анализ встречи, поставит задачи и подготовит отчет.
                  Выберите встречу в таблице или воспользуйтесь поиском,
                  выберите тип ассистента и получите готовый результат
                </div>
              </div>
              {/* Submit Button */}
              <button type="submit">Отправить</button>
            </div>
          </div>
        </form>

        <hr />

        {/* data */}

        <div className="table-container">
          {/* Search and Filter */}

          <form onSubmit={""} className="second">
            <div className="search__row last">
              <div className="ant-form-item">
                <label htmlFor="name">
                  <img src="/searchIcon.svg" alt="icon" />
                </label>
                <input
                  id="name"
                  className="search"
                  type="text"
                  placeholder={"Поиск"}
                  name="name"
                />
              </div>
              <div className="ant-form-item ab">
                <label htmlFor="tip" className="ab">
                  <img src="/ab.svg" alt="icon" />
                </label>
                <input type="text" id="tip" placeholder={"По названию"} />
              </div>
              <div className="ant-form-item ab">
                <label htmlFor="tip" className="ab">
                  <img src="/date__icon.svg" alt="icon" />
                </label>
                <input
                  type="text"
                  id="tip"
                  className="po-date"
                  placeholder={"По дате"}
                />
              </div>
              <div className="ant-form-item ab">
                <label htmlFor="tip" className="ab">
                  <img src="/link__icon.svg" alt="icon" />
                </label>
                <input
                  type="text"
                  className="po-request"
                  id="tip"
                  placeholder={"По типу запроса"}
                />
              </div>
            </div>
          </form>

          {/* Table */}

          <div className="table__parent">
            <table className="table" cellPadding={"10px"} cellSpacing={"10px"}>
              <thead>
                <tr>
                  <th>Название</th>
                  <th>Дата</th>
                  <th>Тип анализа</th>
                  <th>Статус</th>
                  <th>Результат</th>
                </tr>
              </thead>
              <tbody>
                {asistant?.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{moment(item.created_at).format("DD.MM.YYY")}</td>
                    <td>
                      {item.prompt?.length > 50
                        ? item.prompt?.slice(0, 50) + "..."
                        : item.prompt}
                    </td>
                    <td>{item?.status} В обработке</td>
                    <td>
                      <div className="btns">
                        <a
                          href="#"
                          download={"#"}
                          className="btn btn__download"
                        >
                          Скачать
                        </a>
                        <button className="btn btn__send__email">
                          Отправить на почту
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Asistant;
