"use client";
// src/components/Sidebar.js
import React, { useState } from "react";
import "../styles/sidebar.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = ({ sidebar, handleScroll }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

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

                <a href="#">Загрузить файл</a>
              </div>
              <div className="dropdown-content-item">
                <img src="/meeting-icon.svg" alt="camera" />
                <a href="#">Google Meet</a>
              </div>
              <div className="dropdown-content-item">
                <img src="/zoom-icon.svg" alt="camera" />
                <a href="#">Zoom</a>
              </div>
              <div className="dropdown-content-item">
                <img src="/camera-icon.svg" alt="" />
                <a href="#">Telemost</a>
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
          <p>Осталось минут</p>
          <span>140 из 300</span>
        </div>
        <div className="progress-bar">
          <div className="progress" style={{ width: "47%" }}></div>
        </div>
        <Link href={"/dashboard/tarif"} className="btn btn-outline">
          Расширить тариф
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
