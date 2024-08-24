"use client";

import React, { useEffect, useState } from "react";
import TranscriptionTable from "@/components/TranscriptionTable";
import "../../../styles/transcription.css";
import useHttp from "@/app/hooks/useHttp";
import { baseAPI } from "@/constants/domain";
import Loading from "@/components/Loading";
import { message } from "antd";
import { URLS } from "@/constants/url";

const MyTranscriptions = () => {
  const { request, loading, error } = useHttp();
  const [transcriptions, setTranscriptions] = useState([]);
  const token =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("token")) || null
      : null;

  const getMyTranscriptions = async () => {
    const url = baseAPI + URLS.transcriptions;
    try {
      const response = await request(url, "GET");
      setTranscriptions(response);
    } catch (err) {
      console.error("Error fetching data:", err);
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

      if (response.status === "Processing") {
        getMyTranscriptions();
      }
      message.success(`${file.name} file uploaded successfully.`);
    } catch (error) {
      message.error(
        error.response?.data?.error ||
          error.response?.data?.code ||
          "An error occurred"
      );
    }
  };

  useEffect(() => {
    getMyTranscriptions();
  }, []); // Empty dependency array to run only once on mount

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      sendAudioFile(selectedFile);
    }
  };

  useEffect(() => {
    const socket = new WebSocket(
      `wss://worldspeechai.com/ws/connect/?token=${token}`
    );

    socket.onopen = () => {};

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "transcription_result") {
        if (data.data.status === "processing") {
          getMyTranscriptions();
        }
        if (data.data.status === "completed") {
          message.success(`${data.data.name} ${data.data.status}`);
          getMyTranscriptions();
        }
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
    <div className="transcription">
      <div className="section-title">Мои транскрипции</div>
      <div className="transcriptions__block">
        {loading && <Loading />}
        {error && <p>{error}</p>}
        {!loading && !error && transcriptions.length === 0 && (
          <div className="not-transcription">
            <p>
              Вы пока не создали ни одну <br /> транскрипцию
            </p>
            <label htmlFor="transcription__upload" className="btn btn-primary">
              Загрузить файлы
            </label>
            <input
              type="file"
              id="transcription__upload"
              onChange={handleFileChange}
            />
          </div>
        )}
        {!loading && !error && transcriptions.length > 0 && (
          <TranscriptionTable transcriptions={transcriptions} />
        )}
      </div>
    </div>
  );
};

export default MyTranscriptions;
