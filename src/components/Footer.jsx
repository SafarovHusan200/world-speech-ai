"use client";
import Link from "next/link";
import React from "react";
import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="logo">
            <img src="/logo-full-icon.svg" alt="logo" />
          </div>

          <div className="row footer_mobile--link">
            <Link href={"https://t.me/Worldspeechai/5"}>
              <img src="/tg_icon.svg" alt="" />
            </Link>
            <Link href={"http://www.youtube.com/@Worldspeechai1 "}>
              <img src="/youtube_icon.svg" alt="" />
            </Link>
          </div>

          <nav className="navbar">
            <ul>
              <li>
                <Link href="#tarif">Тарифы</Link>
              </li>

              <li>
                <Link href="#feedback">Кейсы</Link>
              </li>
              <li>
                <Link href="#faq">FAQ</Link>
              </li>
              <li>
                <Link href="/project-news">Новости</Link>
              </li>
            </ul>
          </nav>

          <div className="footer_right">
            <div className="row">
              <Link href="/cooperation">Сотрудничество</Link>
              <Link href="/technical-support">Написать в поддержку</Link>
            </div>
            <div className="row">
              <Link href={"https://t.me/Worldspeechai/5"}>
                <img src="/tg_icon.svg" alt="" />
              </Link>
              <Link href={"http://www.youtube.com/@Worldspeechai1"}>
                <img src="/youtube_icon.svg" alt="" />
              </Link>
            </div>
          </div>
        </div>

        <hr className="hr" />

        <div className="footer__bottom">
          <div className="footer__bottom--left">
            <Link href={"/policy"}>Политика обработки персональных данных</Link>
            <Link href={"/offer"}>Оферта</Link>
          </div>

          <div className="footer__bottom--right">
            <p>Москва</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
