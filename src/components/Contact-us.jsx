"use client";

import React, { useState } from "react";
import "../styles/contact-us.css";
import useHttp from "@/app/hooks/useHttp";
import { baseAPI } from "@/constants/domain";
import { URLS } from "@/constants/url";
import { message } from "antd";

const ContactUs = () => {
  const { request, loading } = useHttp();
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    message: "Хочет связаться",
    recipient_email: "company@worldspeech.ru",
  });

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formValues.email === "" || formValues.name === "") {
      return message.warning("Пожалуйста, заполните вход");
    }

    if (!isValidEmail(formValues.email)) {
      return message.warning(
        "Пожалуйста, введите действительный адрес электронной почты"
      );
    }

    const url = `${baseAPI + URLS.support}`;
    request(url, "POST", formValues)
      .then((response) => {
        message.success(response.message);

        // Forma ma'lumotlarini tozalash
        setFormValues({
          name: "",
          email: "",
          message: "Хочет связаться",
          recipient_email: "company@worldspeech.ru",
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        message.error(error.message || "Error occurred");
      });
  };

  return (
    <section className="contact-us">
      <div className="container">
        <div className="contact-us__block">
          <div className="left">
            <div className="left__head">
              <h3 className="title">Связаться с нами</h3>
              <p>
                Заполните форму ниже, и мы ответим на ваш запрос в течение 8
                часов
              </p>

              <form className="contact-us__form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Имя"
                  onChange={handleChange}
                  value={formValues.name}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Почта"
                  onChange={handleChange}
                  value={formValues.email}
                />
                <button className="btn btn-primary" disabled={loading}>
                  {loading ? "Отправка..." : "Отправить"}
                </button>
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
