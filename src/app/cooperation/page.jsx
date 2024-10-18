"use client";

import Link from "next/link";
import React, { useState } from "react";
import "../../styles/cooperation.css";
import { URLS } from "@/constants/url";
import { baseAPI } from "@/constants/domain";
import useHttp from "../hooks/useHttp";
import { message } from "antd";

const Cooperation = () => {
  const [values, setValues] = useState({
    name: "",
    message: "",
    email: "hello@worldspeech.ru",
    recipient_email: "hello@worldspeech.ru",
  });
  const { request } = useHttp();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Form submit qilishni to'xtatish

    const url = baseAPI + URLS.support;
    request(url, "POST", values)
      .then((response) => {
        message.success(response.message);

        setValues({
          name: "",
          message: "",
          email: "hello@worldspeech.ru",
          recipient_email: "hello@worldspeech.ru",
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
              Сотрудничество
            </div>
            <div className="cooperation__block--content__descr">
              Чтобы связаться с нами, заполните форму и наши менеджеры ответят
              Вам в течении 15 минут. Или напишите нам на почту{" "}
              <a href="mailto:hello@worldspeech.ru">hello@worldspeech.ru</a>
            </div>
            <form
              className="cooperation__block--content__form"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                placeholder="Имя"
                name="name"
                onChange={(e) =>
                  setValues((prev) => ({ ...prev, name: e.target.value }))
                }
                required
                value={values.name}
              />

              <textarea
                name="message"
                cols="30"
                rows="10"
                placeholder="Сообщение"
                required
                onChange={(e) =>
                  setValues((prev) => ({ ...prev, message: e.target.value }))
                }
                value={values.message}
              ></textarea>

              <button type="submit" className="btn btn-primary">
                Отправить
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

export default Cooperation;
