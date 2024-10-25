"use client";

import React, { useEffect, useRef, useState } from "react";
import "../../../styles/assistant.css";
import useHttp from "@/app/hooks/useHttp";
import { baseAPI } from "@/constants/domain";
import Loading from "@/components/Loading";

import { URLS } from "@/constants/url";

import { message } from "antd";
import dynamic from "next/dynamic";
const Select = dynamic(() => import("react-select"), { ssr: false });
import FileAnalysisTable from "@/components/FileAnalysisTable";

const Asistant = () => {
  const isFirstRender = useRef(true);
  const { request, loading, error } = useHttp();
  const [asistant, setAsistants] = useState([]);
  const [fileAnalysis, setFileAnalists] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [search, setSearch] = useState({
    transcription_name: "", //nazvanie
    assistant_name: "", //tip analiza
    created_at: "",
  });

  const [uploadState, setUploadState] = useState({
    transcription_id: "",
    assistant_id: "",
    bitrix_lead_name: "",
    bitrix_chat_url: "",
    start_time: "",
    end_time: "",
  });

  const [transcriptions, setTranscriptions] = useState([]);

  const token =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("token")) || null
      : null;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Form validation
    if (
      uploadState.transcription_id === "" ||
      uploadState.assistant_id === ""
    ) {
      return message.warning("Пожалуйста, заполните поле");
    }

    const url = `${baseAPI + URLS.upload_analysis}`;

    const obj = {
      ...(uploadState.transcription_id && {
        transcription_id: uploadState.transcription_id,
      }),
      ...(uploadState.assistant_id && {
        assistant_id: uploadState.assistant_id,
      }),
      ...(uploadState.bitrix_lead_name && {
        bitrix_lead_name: uploadState.bitrix_lead_name,
      }),
      ...(uploadState.bitrix_chat_url && {
        bitrix_chat_url: uploadState.bitrix_chat_url,
      }),
      ...(uploadState.start_time && { start_time: uploadState.start_time }),
      ...(uploadState.end_time && { end_time: uploadState.end_time }),
    };

    // POST request
    request(url, "POST", obj)
      .then((response) => {
        message.success(response?.status || "Processing started");
        getFileAnalists();
        // Reset form state
        setUploadState({
          transcription_id: "",
          assistant_id: "",
          bitrix_lead_name: "",
          bitrix_chat_url: "",
          start_time: "",
          end_time: "",
        });

        // Clear form fields
        e.target.reset();
        return response;
      })
      .catch((error) => {
        const errorMessage =
          error?.response?.data?.message || "Ошибка загрузки";
        message.error(errorMessage);
        console.error("Error fetching data:", error);
        return error;
      });
  };

  // Select uchun variantlar
  const transcriptionOptions = transcriptions?.map((t) => ({
    value: t.id,
    label: t.name,
  }));

  const assistantOptions = asistant?.map((t) => ({
    value: t.id,
    label: t.name,
  }));

  const getFileAnalists = async () => {
    const url = baseAPI + URLS.file_analysis;
    try {
      const response = await request(url, "GET");

      setFileAnalists(response);
      setFilterData(response);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const getMyTranscriptions = async () => {
    const url = `${baseAPI}${URLS.transcriptions}?status=completed`;

    try {
      const response = await request(url, "GET");
      setTranscriptions(response);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };
  const getAsistent = async () => {
    const url = baseAPI + URLS.asistants;
    try {
      const response = await request(url, "GET");
      setAsistants(response);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const sendMessageEmail = (id) => {
    const url = `${
      baseAPI + "/api/v1/file_analysis/" + id + "/send_analysis_email/"
    }`;

    request(url, "POST")
      .then((response) => {
        message.success(response?.detail);
        return response;
      })
      .catch((error) => {
        message.error(error);
        console.error("Error fetching data:", error);
        return error;
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    // Yangi qidiruv qiymatlarini olish
    setSearch((prevState) => ({
      ...prevState,
      [name]: value,
    })); // Yangi filtrlash natijalarini yangilash
  };

  const handleClearDate = () => {
    setSearch({
      ...search,
      created_at: "",
    });
  };

  useEffect(() => {
    // getFileAnalists();
    getMyTranscriptions();
    getAsistent();
  }, []);

  useEffect(() => {
    const { transcription_name, assistant_name, created_at } = search;
    let filteredData = [...fileAnalysis];

    // Agar barcha qidiruv maydonlari bo'sh bo'lsa, barcha ma'lumotni ko'rsatish
    if (
      transcription_name === "" &&
      assistant_name === "" &&
      created_at === ""
    ) {
      setFileAnalists(fileAnalysis); // Barcha ma'lumotni qaytarish
    } else {
      filteredData = fileAnalysis.filter(
        (f) =>
          (transcription_name === "" ||
            f.transcription_name
              .toString()
              .toLowerCase()
              .includes(transcription_name.toLowerCase())) &&
          (assistant_name === "" ||
            f.assistant_name
              .toString()
              .toLowerCase()
              .includes(assistant_name.toLowerCase()))
      );
    }
    setFilterData(filteredData); // Filtrlash natijalarini yangilash
  }, [search]);

  useEffect(() => {
    const getDateFilter = async () => {
      const url = `${baseAPI}${URLS.file_analysis}?created_at=${search.created_at}`;

      try {
        const response = await request(url, "GET");
        setFilterData(response);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    if (isFirstRender.current) {
      isFirstRender.current = false; // Birinchi renderdan keyin flagni o'zgartiramiz
    } else {
      getDateFilter();
      console.log(search.created_at);
    }
  }, [search.created_at]);

  useEffect(() => {
    const socket = new WebSocket(
      `wss://worldspeechai.com/ws/connect/analysis/?token=${token}`
    );

    // x.onopen = () => {};

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data?.data?.status === "completed") {
        console.log("websoket finish", data);
        message.success(
          `${data?.data?.transcription_name} ${data?.data?.status}`
        );
        getFileAnalists();
      }
    };

    socket.onclose = (event) => {
      if (event.wasClean) {
        console.log(
          `[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`
        );
      } else {
        console.error("[close] Connection died. Reconnecting...");
        // WebSocket avtomatik ravishda qayta ulanadi
        // initializeWebSocket(); // Bu qator kerak emas, yangi soket avtomatik ishga tushadi
      }
    };

    socket.onerror = (error) => {
      console.error(`[error]`, error); // To'liq error ob'ektini konsolga chiqarish
    };

    // Cleanup: komponent unmount qilinganda ulanishni yopish
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [token]); // tokenni dependency arrayda saqlash kerak bo'lishi mumkin

  return (
    <div className="assistant">
      <div className="section-title">
        Ассистент <img src="/i.svg" alt="" />
      </div>
      <div className="asistant__block">
        <form onSubmit={handleSubmit}>
          <div className="search__row">
            <div className="ant-form-item">
              <label htmlFor="transcription">
                <img src="/searchIcon.svg" alt="icon" />
              </label>
              <Select
                className="datalist"
                id="transcription"
                options={transcriptionOptions}
                placeholder="Например: Встреча с Анастасом"
                onChange={(selectedOption) =>
                  setUploadState({
                    ...uploadState,
                    transcription_id: selectedOption.value,
                  })
                }
              />
            </div>

            <div className="ant-form-item">
              <label htmlFor="assistant">
                <img src="/robot.svg" alt="icon" />
              </label>
              <Select
                className="datalist"
                options={assistantOptions}
                placeholder="Тип ассистента"
                onChange={(selectedOption) =>
                  setUploadState({
                    ...uploadState,
                    assistant_id: selectedOption.value,
                  })
                }
              />
            </div>
          </div>

          <div className="search">
            <label className="timer__label">Тайминг</label>
            <div className="search__row">
              <input
                type="time"
                className="hour"
                value={uploadState.start_time}
                placeholder="hh:mm"
                onChange={(e) =>
                  setUploadState({
                    ...uploadState,
                    start_time: e.target.value, // No need for Number here
                  })
                }
              />

              <input
                type="time"
                className="minut"
                value={uploadState.end_time}
                onChange={(e) =>
                  setUploadState({
                    ...uploadState,
                    end_time: e.target.value, // No need for Number here
                  })
                }
              />

              <input
                type="text"
                className="bitrix"
                placeholder="Ссылка на групповой чат Bitrix 24"
                onChange={(e) =>
                  setUploadState({
                    ...uploadState,
                    bitrix_chat_url: e.target.value,
                  })
                }
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
                onChange={(e) =>
                  setUploadState({
                    ...uploadState,
                    bitrix_lead_name: e.target.value,
                  })
                }
              />

              <div className="information">
                <div className="information__head">i</div>
                <div className="information__body">
                  Проведет анализ встречи, поставит задачи и подготовит отчет.
                  Выберите встречу в таблице или воспользуйтесь поиском,
                  выберите тип ассистента и получите готовый результат
                </div>
              </div>

              <button type="submit">Отправить</button>
            </div>
          </div>
        </form>

        <hr />

        {/* data */}

        {loading && <Loading />}

        <div className="table-container">
          {/* Search and Filter */}

          <form onSubmit={handleSearch} className="second">
            <div className="search__row last">
              <div className="ant-form-item ab">
                <label htmlFor="ab" className="ab">
                  <img src="/ab.svg" alt="icon" />
                </label>
                <input
                  type="text"
                  id="ab"
                  name="transcription_name"
                  placeholder="По названию"
                  onChange={handleSearch}
                  value={search.transcription_name}
                />
              </div>
              <div className="ant-form-item ab">
                <label htmlFor="tip" className="ab">
                  <img src="/date__icon.svg" alt="icon" />
                </label>

                <button className="po-date_x" onClick={handleClearDate}>
                  x
                </button>
                <input
                  type="date"
                  id="tip"
                  name="created_at"
                  className="po-date"
                  placeholder="По дате"
                  onChange={handleSearch}
                  value={search.created_at}
                />
              </div>
              <div className="ant-form-item ab">
                <label htmlFor="analis" className="ab">
                  <img src="/link__icon.svg" alt="icon" />
                </label>
                <input
                  type="text"
                  className="po-request"
                  id="analis"
                  name="assistant_name"
                  placeholder="По типу запроса"
                  onChange={handleSearch}
                  value={search.assistant_name}
                />
              </div>
            </div>
          </form>

          {/* Table */}

          <div className="table__parent">
            <FileAnalysisTable
              filterData={filterData}
              sendMessageEmail={sendMessageEmail}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Asistant;
