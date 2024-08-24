"use client";

import Link from "next/link";
import React, { useState } from "react";
import "../../styles/cooperation.css";
import useHttp from "../hooks/useHttp";
import { baseAPI } from "@/constants/domain";
import { URLS } from "@/constants/url";
import { message } from "antd";

const Support = () => {
  const [values, setValues] = useState({
    name: "",
    message: "",
    email: "company@worldspeech.ru",
    recipient_email: "company@worldspeech.ru",
  });

  const { request, loading } = useHttp();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Form submit qilishni to'xtatish

    const url = baseAPI + URLS.support;
    request(url, "POST", values)
      .then((response) => {
        message.success(response.message);

        setValues({
          name: "",
          message: "",
          email: "company@worldspeech.ru",
          recipient_email: "company@worldspeech.ru",
        });
      })
      .catch((err) => {
        console.log(err);
      });

    e.target.reset(); // Formani tozalash
  };

  return (
    <div className="cooperation">
      <div className="cooperation__block">
        <div className="cooperation__block--content">
          <div>
            <div className="cooperation__block--content__name">
              Техническая поддержка
            </div>
            <div className="cooperation__block--content__descr">
              Чтобы связаться с нами, заполните форму и наши менеджеры ответят
              Вам в течении 15 минут. Или напишите нам на почту{" "}
              <a href="mailto:company@worldspeech.ru">company@worldspeech.ru</a>
            </div>
            <form
              className="cooperation__block--content__form"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                placeholder="Имя"
                name="name"
                value={values.name}
                onChange={(e) => setValues({ ...values, name: e.target.value })}
                required
              />

              <textarea
                name="message"
                cols="30"
                rows="10"
                placeholder="Сообщение"
                value={values.message}
                onChange={(e) =>
                  setValues({ ...values, message: e.target.value })
                }
                required
              ></textarea>

              <button className="btn btn-primary" type="submit">
                Продолжить
              </button>
            </form>
          </div>

          <div className="row">
            <p>
              Нажимая “Отправить”, вы соглашаетесь с <br />
              <Link href={"/offer"}>Офертой</Link> и{" "}
              <Link href={"/policy"}>Политикой конфиденциальности</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
