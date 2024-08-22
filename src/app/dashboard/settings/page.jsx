"use client";

import React, { useEffect, useState } from "react";
import { Button, Form, Input, InputNumber, Switch, message } from "antd";
import "../../../styles/settings.css";
import Link from "next/link";

import { URLS } from "@/constants/url";
import { baseAPI } from "@/constants/domain";

import useHttp from "@/app/hooks/useHttp";
import { useDashboard } from "@/app/hooks/context/dashboardContext";
import CopyText from "@/components/CopyText";
import moment from "moment";
import { useRouter } from "next/navigation";

const Setting = () => {
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

  const router = useRouter();
  const { request, loading, error } = useHttp();
  const { setUser, user } = useDashboard();

  const [autoPayment, setAutoPayment] = useState(true);
  const [newsletter, setNewsletter] = useState(false);
  const [fileFormat, setFileFormat] = useState("pdf");
  const [pay, setPay] = useState([]);

  let url;

  const handleToggle = (setter) => () => {
    setter((prevState) => {
      url = `${baseAPI + URLS.auto_payment}`;
      request(url, "PATCH", { auto_payment: !prevState })
        .then((response) => {
          message.success("Auto payment: " + response?.auto_payment);
          setUser(response);
          return response;
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          return error;
        });

      return !prevState;
    });
  };

  const onFinish = (values) => {
    const obj = {
      name: values.user.name,
      email: values.user.email,
    };
    url = `${baseAPI + URLS.profile}`;
    request(url, "PATCH", obj)
      .then((response) => {
        setUser(response);
        message.success("Update successfully");
        return response;
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        return error;
      });
  };

  const getUserData = async () => {
    url = `${baseAPI + URLS.profile}`;
    request(url, "GET")
      .then((response) => {
        setUser(response);

        return response;
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        return error;
      });
  };

  const getPaymentHistory = () => {
    url = `${baseAPI + URLS.payment_history}`;
    request(url, "GET")
      .then((response) => {
        console.log(response);

        if (response?.code === "user_not_fount") {
          console.log("payment", response);
        } else {
          setPay(response);
        }

        return response;
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        return error;
      });
  };

  const handleFileType = (type) => {
    console.log(type);
    url = `${baseAPI + URLS.profile}`;
    setFileFormat(type);
    request(url, "PATCH", { preferred_format: type })
      .then((response) => {
        message.success("Preferred format: " + response?.preferred_format);
        setUser(response);
        return response;
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        return error;
      });
  };

  const handleCalendar = () => {
    const url = baseAPI + URLS.calendar;
    console.log(user);

    if (user?.is_subscribed_to_calendar) {
      request(url, "DELETE")
        .then((res) => {
          console.log(res);
          message.success(res.status);
          getUserData();
        })
        .catch((err) => {
          console.log("calendar1", err);
          message.error(err.response.data?.error);
        });
    } else {
      request(url, "POST")
        .then((res) => {
          console.log(res);
          message.success(res.status);
          getUserData();
        })
        .catch((err) => {
          console.log("calendar2", err);
          message.error(err.response.data?.error);
        });
    }
  };

  const Logout = () => {
    router.push("/auth/login");
    localStorage.clear("token");
    localStorage.clear("refresh");
    localStorage.setItem("isLogin", JSON.stringify(false));
  };

  useEffect(() => {
    if (user) {
      setAutoPayment(user?.auto_payment);
      setFileFormat(user?.preferred_format);
      console.log(user);
      getPaymentHistory();
    } else {
      getUserData();
    }
  }, [user]);

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
          <Input placeholder={user?.name || "Никнейм"} />
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
          <Input placeholder={user?.email || "example@google.com"} />
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
              onChange={() => handleFileType("txt")}
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
              id="word"
              checked={fileFormat === "word"}
              onChange={() => handleFileType("word")}
            />

            <label htmlFor="word">
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
              onChange={() => handleFileType("pdf")}
            />
            <label htmlFor="pdf">
              <b>.pdf</b>
              <b>Экспорт в формате PDF</b>
            </label>
          </div>
        </div>
        <div className="settings-item__btn ">
          <p className="calendar">Google Calendar</p>
          <p className="not">
            {user.is_subscribed_to_calendar
              ? `Подключен  ${user?.email}`
              : "Отсутствует"}
          </p>
          <Link href={"#!"} onClick={() => handleCalendar()}>
            {user.is_subscribed_to_calendar ? "Отключить" : "Подключить"}
          </Link>
        </div>
        <div className="settings-item__btn">
          <p className="api-key">API key</p>
          {/* <p className="key">{user?.api_key}</p> */}

          <CopyText text={user?.api_key} />

          {/* <div className="settings-item">
            <button className="btn-primary">Скопировать</button>
            <Link href="#documentation">Документация</Link>
          </div> */}
        </div>
        <div className="settings-item">
          <button className="btn btn-outline" onClick={() => Logout()}>
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
              {pay?.length > 0 &&
                pay?.map((payme) => (
                  <tr key={pay.payment_id}>
                    <td>{payme.payment_id}</td>
                    <td>
                      {moment(payme.purchased_at).format(
                        "MMMM Do YYYY, h:mm:ss "
                      )}
                    </td>
                    <td>Оплачено</td>
                    <td>{payme.plan_price}$</td>
                  </tr>
                ))}
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
