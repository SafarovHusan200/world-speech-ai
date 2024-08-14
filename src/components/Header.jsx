"use client";
import React, { useEffect, useState } from "react";
import "../styles/header.css";
import Link from "next/link";

const Header = () => {
  const [menu, setMenu] = useState(false);
  const [stick, setStick] = useState(false);

  const toggleMenu = () => setMenu(!menu);
  const closeMenu = () => setMenu(false);

  useEffect(() => {
    const handleScroll = () => {
      setStick(window.scrollY > 150);
      closeMenu();
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`header ${stick ? "stick" : ""}`}>
      <div className="container">
        <div className="header_block">
          <Link href="/" className="logo">
            <img src="/logo-full-icon.svg" alt="logo" />
          </Link>

          <nav className={`navbar ${menu ? "active" : ""}`}>
            <div className="menu-top">
              <div className="row">
                <button className="close_menu" onClick={toggleMenu}>
                  <img src="/close.png" className="close_icon" alt="close" />
                </button>
              </div>

              <ul>
                <li>
                  <Link href="/#tarif">Тарифы</Link>
                </li>
                <li>
                  <Link href="/#safety">Безопасность</Link>
                </li>
                <li>
                  <Link href="/#feedback">Отзывы</Link>
                </li>
                <li>
                  <Link href="/#faq">FAQ</Link>
                </li>
                <li>
                  <Link href="/#news">Новости</Link>
                </li>
                <li>
                  <Link href="/technical-support">Помощь</Link>
                </li>
              </ul>
            </div>

            <div className="menu__bottom">
              <div className="auth">
                <Link href="/auth/login" className="btn btn-outline">
                  Вход
                </Link>
                <Link href="/auth/register" className="btn btn-primary">
                  Регистрация
                </Link>
              </div>
            </div>
          </nav>

          <div className="actions">
            <div className="auth">
              <Link href="/auth/login" className="btn btn-outline">
                Вход
              </Link>
              <Link href="/auth/register" className="btn btn-primary">
                Регистрация
              </Link>
            </div>

            <button className="open_menu" onClick={toggleMenu}>
              <img src="/menu-icon.svg" alt="menu" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
