"use client";

import TranscriptionTable from "@/components/TranscriptionTable";
import React from "react";
import "../../../styles/transcription.css";

const MyTranscriptions = () => {
  return (
    <div className="transcription">
      <div className="section-title">Мои транскрипции </div>
      <div className="transcriptions__block">
        {/* data not found */}
        <div className="not-transcription">
          <p>
            Вы пока не создали ни одну <br /> транскрипцию
          </p>

          <label htmlFor="transcription__upload" className="btn btn-primary">
            Загрузить файлы
          </label>
          <input type="file" id="transcription__upload" />
        </div>

        <TranscriptionTable />
      </div>
    </div>
  );
};

export default MyTranscriptions;
