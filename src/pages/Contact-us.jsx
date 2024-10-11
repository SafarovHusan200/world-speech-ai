import React from "react";
import "../styles/contact-us.css";
import Link from "next/link";

const ContactUs = () => {
  return (
    <section className="contact-us" id="">
      <div className="container">
        <div className="contact-us__block">
          <div className="left">
            <div className="left__head">
              <h3 className="title">Связаться с нами</h3>
              <p>
                Заполните форму ниже, и мы ответим на ваш запрос в течение 8
                часов
              </p>

              <form className="contact-us__form">
                <input type="text" name="name" placeholder="Имя" />
                <input type="text" name="name" placeholder="Почта" />
                <button className="btn btn-primary">Отправить</button>
              </form>
            </div>

            <div className="left__footer">
              <div className="squares">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <a href="mailto:company@worldspeechai.com">
                company@worldspeechai.com
              </a>
            </div>
          </div>

          <div className="right">
            <img src="/contact-us__bg.png" alt="img" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
