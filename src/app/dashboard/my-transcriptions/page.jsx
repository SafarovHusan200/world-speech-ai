"use client";

import React, { useEffect, useState } from "react";
import TranscriptionTable from "@/components/TranscriptionTable";
import "../../../styles/transcription.css";
import useHttp from "@/app/hooks/useHttp";
import { baseAPI } from "@/constants/domain";
import Loading from "@/components/Loading";

const MyTranscriptions = () => {
  const { request, loading, error } = useHttp();
  const [transcriptions, setTranscriptions] = useState([]);

  const getMyTranscriptions = async () => {
    try {
      const data = await request(baseAPI + "/api/v1/transcriptions/", "GET");
      setTranscriptions(data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    getMyTranscriptions();
  }, []); // Empty dependency array to run only once on mount

  return (
    <div className="transcription">
      <div className="section-title">Мои транскрипции </div>
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
            <input type="file" id="transcription__upload" />
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
