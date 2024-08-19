"use client";

import React from "react";
import { Table, Tag } from "antd";
import moment from "moment";

const TranscriptionTable = ({ transcriptions }) => {
  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Дата",
      dataIndex: "created_at",
      key: "created_at",
      render: (text) => moment(text).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "Название",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Длительность",
      dataIndex: "duration",
      key: "duration",
      render: (text) =>
        text !== "None"
          ? `${Math.floor(text / 60)}:${Math.round(text % 60)} `
          : "No Duration",
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
        return <b style={{ color: color }}>{prog}</b>;
      },
    },

    {
      title: "Источник",
      dataIndex: "source_type",
      key: "source_type",
    },

    {
      title: "",
      dataIndex: "result_file",
      key: "result_file",
      render: (text) =>
        text !== "None" ? (
          <a href={text} target="_blank" rel="noopener noreferrer">
            <img src="/download1.svg" alt="icon" />
          </a>
        ) : (
          "No File"
        ),
    },
  ];

  return <Table columns={columns} dataSource={transcriptions} rowKey="id" />;
};

export default TranscriptionTable;
