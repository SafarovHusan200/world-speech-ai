"use client";

import React, { useState } from "react";
import { Button, Form, Input, InputNumber, Switch } from "antd";
import "../../../styles/settings.css";
import Link from "next/link";
import { signOut } from "next-auth/react";

const Setting = () => {
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "пользователя требуется!!",
    types: {
      email: "адрес электронной почты недействителен!!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };
  /* eslint-enable no-template-curly-in-string */

  const [autoPayment, setAutoPayment] = useState(true);
  const [newsletter, setNewsletter] = useState(false);
  const [fileFormat, setFileFormat] = useState("txt");

  const handleToggle = (setter) => () => setter((prev) => !prev);
  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <div className="settings">
      <div className="section-title">Настройки</div>

      <Form
        className="form__username-and-email"
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={["user", "name"]}
          //   label="Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="Никнейм" />
        </Form.Item>
        <Form.Item
          name={["user", "email"]}
          //   label="Email"
          rules={[
            {
              type: "email",

              required: true,
            },
          ]}
        >
          <Input placeholder="example@google.com" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="btn btn-primary">
            Сохранить
          </Button>
        </Form.Item>
      </Form>

      {/*  */}

      <div className="form__elements">
        <div className="settings-item">
          <p> Разрешить боту записывать и транскрибировать встречи</p>
          <input type="checkbox" id="dostup" name="dostup" />
          <label htmlFor="dostup">
            <span></span>
          </label>
        </div>
        <div className="settings-item">
          <p> Автоплатеж</p>
          <input
            id="autoPayment"
            name="autoPayment"
            type="checkbox"
            checked={autoPayment}
            onChange={handleToggle(setAutoPayment)}
          />
          <label htmlFor="autoPayment">
            <span></span>
          </label>
        </div>
        <div className="settings-item">
          <p> Подписка на рассылки</p>
          <input
            id="newsletter"
            name="newsletter"
            type="checkbox"
            checked={newsletter}
            onChange={handleToggle(setNewsletter)}
          />
          <label htmlFor="newsletter">
            <span></span>
          </label>
        </div>
        <div className="settings-item col">
          <p className="format__file">Формат скачивания файла</p>

          <div className="settings-item__radio">
            <input
              type="radio"
              name="fileFormat"
              id="txt"
              checked={fileFormat === "txt"}
              onChange={() => setFileFormat("txt")}
            />
            <label htmlFor="txt">
              <b>.txt</b>
              <b>Экспорт в формате .txt</b>
            </label>
          </div>

          <div className="settings-item__radio">
            <input
              type="radio"
              name="fileFormat"
              id="doc"
              checked={fileFormat === "doc"}
              onChange={() => setFileFormat("doc")}
            />

            <label htmlFor="doc">
              <b>.doc</b>
              <b>Экспорт в формате Microsoft Word</b>
            </label>
          </div>

          <div className="settings-item__radio">
            <input
              type="radio"
              name="fileFormat"
              id="pdf"
              checked={fileFormat === "pdf"}
              onChange={() => setFileFormat("pdf")}
            />
            <label htmlFor="pdf">
              <b>.pdf</b>
              <b>Экспорт в формате PDF</b>
            </label>
          </div>
        </div>
        <div className="settings-item__btn ">
          <p className="calendar">Google Calendar</p>
          <p className="not">Отсутствует</p>
          <Link href={"#!"}>Подключить</Link>
        </div>
        <div className="settings-item__btn">
          <p className="api-key">API key</p>
          <p className="key">b0e1a815-aaf9-4c52-8102-9bb4db9b06b5</p>
          <div className="settings-item">
            <button className="btn-primary">Скопировать</button>
            <Link href="#documentation">Документация</Link>
          </div>
        </div>
        <div className="settings-item">
          <button onClick={() => signOut()} className="btn btn-outline">
            Выйти
          </button>
        </div>

        <div className="transaction-history">
          <div className="title">История транзакций</div>

          <table>
            <thead>
              <tr>
                <th>Номер заказа</th>
                <th>Дата</th>
                <th>Статус платежа</th>
                <th>Стоимость</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>#2939323923</td>
                <td>Май 12, 2024 по Июнь 12, 2024</td>
                <td>Оплачено</td>
                <td>9,99$</td>
              </tr>
              <tr>
                <td>#2939323923</td>
                <td>Май 12, 2024 по Июнь 12, 2024</td>
                <td>Оплачено</td>
                <td>9,99$</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="settings-links">
        <Link href={"/policy"}>Политика обработки персональных данных</Link>
        <Link href={"/technical-support"}> Написать в поддержку</Link>
      </div>
    </div>
  );
};

export default Setting;
