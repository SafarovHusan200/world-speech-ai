"use client";

import React from "react";
import { Table, Tag } from "antd";
import moment from "moment";

const FileAnalysisTable = ({ filterData, sendMessageEmail }) => {
  const columns = [
    {
      title: "Название",
      dataIndex: "transcription_name",
      key: "transcription_name",
    },
    {
      title: <span className="tableupdateData">Дата </span>,
      dataIndex: "created_at",
      key: "created_at",
      render: (text) => moment(text).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: <span className="tableupdateData">Тип анализа </span>,
      dataIndex: "assistant_name",
      key: "assistant_name",
    },
    {
      title: "Статус",
      dataIndex: "status",
      key: "status",
      render: (text) => {
        let prog =
          text === "completed"
            ? "завершена"
            : text === "error"
            ? "error"
            : "Processing";
        let color =
          text === "completed"
            ? "#7E7E7E"
            : text === "error"
            ? "red"
            : "#007BFF";
        return <span style={{ color: color }}>{prog}</span>;
      },
    },
    {
      title: "Результат",
      dataIndex: "analysis_file",
      key: "analysis_file",
      render: (text) =>
        text !== "None" ? (
          <a
            href={text}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="btn btn__download"
          >
            Скачать
          </a>
        ) : null,
    },
    {
      title: "",
      dataIndex: "status",
      key: "status",
      render: (text, record) =>
        text === "completed" ? (
          <button
            className="btn btn__send__email"
            onClick={() => sendMessageEmail(record.id)} // using record.id here
          >
            Отправить на почту
          </button>
        ) : null,
    },
  ];

  return (
    <div>
      {filterData.length === 0 ? (
        <p>Информация не найдена.</p>
      ) : (
        <Table columns={columns} dataSource={filterData} rowKey="id" />
      )}
    </div>
  );
};

export default FileAnalysisTable;
