import React from "react";
import { message } from "antd"; // Ant Design message importi
import Link from "next/link";

const CopyText = ({ text }) => {
  const copyContent = async () => {
    try {
      await navigator.clipboard.writeText(text);
      message.success("Content copied to clipboard"); // Muvaffaqiyatli nusxalash xabari
    } catch (err) {
      message.error("Failed to copy"); // Xato yuz bersa xabar
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <>
      <p className="key">{text}</p>
      <div className="settings-item">
        <button className="btn-primary" onClick={copyContent}>
          Скопировать
        </button>
        <Link
          target="_blank"
          href="https://documenter.getpostman.com/view/28274540/2sAXjQ1q8k"
        >
          Документация
        </Link>
      </div>
    </>
  );
};

export default CopyText;
