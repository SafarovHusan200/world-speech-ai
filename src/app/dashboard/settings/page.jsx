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
import axios from "axios";

const Setting = () => {
  const { setUser, user } = useDashboard();
  const [editUser, setEditUser] = useState({
    name: user?.name,
    email: user?.email,
  });
  const [activeIndex, setActiveIndex] = useState(null);
  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const router = useRouter();
  const { request, loading, error } = useHttp();

  const [autoPayment, setAutoPayment] = useState(true);
  const [newsletter, setNewsletter] = useState(false);
  const [fileFormat, setFileFormat] = useState("pdf");
  const [pay, setPay] = useState([]);
  const [calendar, setCalendar] = useState(false);
  const [googleCalendar, setGoogleCalendar] = useState();

  let url;

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

  const handleToggle = (setter) => {
    setAutoPayment(!autoPayment);

    url = `${baseAPI + URLS.auto_payment}`;
    request(url, "PATCH", { auto_payment: !autoPayment })
      .then((response) => {
        message.success(response?.status);

        return response;
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        return error;
      });
  };

  const onFinish = (e) => {
    e.preventDefault();
    const obj = {
      name: editUser.name,
      email: editUser.email,
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

  const getPaymentHistory = () => {
    url = `${baseAPI + URLS.payment_history}`;
    request(url, "GET")
      .then((response) => {
        if (response?.code === "user_not_fount") {
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

  const haveToCalendar = async () => {
    const url = baseAPI + URLS.connect_calendar;
    request(url, "GET")
      .then((res) => {
        if (res.uid) {
          setGoogleCalendar(res.uid);
        } else {
          setGoogleCalendar(null);
        }
      })
      .catch((err) => {
        if (err === "Social auth record not found") {
          setGoogleCalendar(null);
        }
      });
  };

  const handleCalendarConnect = async () => {
    if (!googleCalendar) {
      const url =
        "https://worldspeechai.com/api/v1/auth/o/google-oauth2/?redirect_uri=https://worldspeechai.com/dashboard/settings";

      try {
        request(url, "GET")
          .then((response) => {
            window.location.href = response.authorization_url;
          })
          .catch((err) => {
            console.log(err, "error");
          });
      } catch (err) {
        console.log(err, "err 2");
      }
    } else {
      const url = baseAPI + URLS.google;

      request(url, "DELETE")
        .then((res) => {
          console.log("nima gap", res);
          setGoogleCalendar(null);
        })
        .catch((err) => {
          console.log("errrr", err);
        });
    }
  };

  const handleCalendar = () => {
    setCalendar(!calendar);

    const url = baseAPI + URLS.calendar;

    if (user?.is_subscribed_to_calendar) {
      request(url, "DELETE")
        .then((res) => {
          message.success(res.status || res);
          getUserData();
        })
        .catch((err) => {
          getUserData();

          message.error(err.response?.data?.error || err);
        });
    } else {
      request(url, "POST")
        .then((res) => {
          message.success(res.status || res);
          getUserData();
        })
        .catch((err) => {
          getUserData();
          message.error(err.response?.data?.error || err);
          // handleCalendarConnect();
        });
    }
  };

  const subscribedNewsletter = () => {
    const url = baseAPI + URLS.profile;
    setNewsletter(!newsletter);

    request(url, "PATCH", {
      subscribed_to_newsletter: !newsletter,
    })
      .then((res) => {
        message.success(
          "subscribed to newsletter " + res.subscribed_to_newsletter
        );
      })
      .catch((err) => {});
  };

  const Logout = () => {
    router.push("/auth/login");
    localStorage.clear("token");
    localStorage.clear("refresh");
    localStorage.setItem("isLogin", JSON.stringify(false));
  };

  useEffect(() => {
    if (user) {
      getPaymentHistory();
      setAutoPayment(user?.auto_payment);
      setFileFormat(user?.preferred_format);
      setCalendar(user?.is_subscribed_to_calendar);
      setEditUser({ name: user?.name, email: user?.email });
    } else {
      getUserData();
    }
    haveToCalendar();
  }, [user]);

  useEffect(() => {
    const currentUrl = window.location.href;

    // 'state' dan boshlab hamma narsani olamiz
    const stateIndex = currentUrl.indexOf("state="); // 'state=' qayerdan boshlanishini topamiz

    if (stateIndex !== -1) {
      const state = currentUrl.substring(stateIndex);

      // localStorage'dagi tokenni olamiz
      const token = JSON.parse(localStorage.getItem("token"));

      axios
        .post(
          "https://worldspeechai.com/api/v1/auth/link/google/?" + state,
          null,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Bearer tokenni qo'shamiz
            },
          }
        )
        .then((response) => {
          if (response.data.access && response.data.refresh) {
            localStorage.setItem("token", JSON.stringify(response.data.access));
            localStorage.setItem(
              "refresh",
              JSON.stringify(response.data.refresh)
            );
            localStorage.setItem("isLogin", JSON.stringify(true));
            // router.push("/dashboard");
          }
        })
        .catch((err) => {
          console.error("Request Error:", err);
        });
    }
  }, []);

  return (
    <div className="settings">
      <div className="section-title">Настройки</div>

      <form
        className="form__username-and-email"
        name="nest-messages"
        onSubmit={onFinish}
      >
        <div className="col">
          <div className="ant-form-item">
            <label htmlFor="username">
              <img src="/edit.svg" alt="icon" />
            </label>
            <input
              id="username"
              type="text"
              placeholder={user?.name || "Никнейм"}
              name="name"
              onChange={(e) =>
                setEditUser({ ...editUser, name: e.target.value })
              }
              value={editUser.name || ""}
            />
          </div>
          <div className="ant-form-item">
            <input
              type="text"
              placeholder={user?.email || "example@google.com"}
              onChange={(e) =>
                setEditUser({ ...editUser, email: e.target.value })
              }
              value={editUser.email || ""}
              disabled
            />
          </div>
        </div>

        <div className="col">
          <div className="ant-form-item btns">
            <button className=" btn-primary">Сохранить</button>
          </div>
        </div>
      </form>

      {/*  */}

      <div className="form__elements">
        <div className="settings-item">
          <p> Разрешить боту записывать и транскрибировать встречи</p>
          <input
            type="checkbox"
            id="dostup"
            name="dostup"
            checked={calendar}
            onChange={() => handleCalendar()}
          />
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
            onChange={() => handleToggle()}
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
            onChange={() => subscribedNewsletter()}
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

        <div className="accordion">
          <div className="accordionItem">
            <div
              className={`accordionHeader`}
              onClick={() => toggleAccordion(0)}
            >
              <p className="calendar">
                Google Calendar{" "}
                <img
                  src="/up_icon.svg"
                  alt="icon"
                  className={` ${activeIndex === 0 ? "active" : ""}`}
                />
              </p>
            </div>
            <div
              className={`accordionContent ${
                activeIndex === 0 ? "active" : ""
              }`}
            >
              {/* {item.content} */}
              <p className="not">
                {googleCalendar
                  ? `Подключен  ${googleCalendar}`
                  : "Отсутствует"}
              </p>
              <span
                className="connect-google"
                onClick={() => handleCalendarConnect()}
              >
                {googleCalendar ? "Отключить" : "Подключить"}
              </span>
            </div>
          </div>
          {/* item2 */}
          <div className="accordionItem">
            <div
              className={`accordionHeader`}
              onClick={() => toggleAccordion(1)}
            >
              <p className="calendar">
                Telegram{" "}
                <img
                  src="/up_icon.svg"
                  alt="icon"
                  className={` ${activeIndex === 1 ? "active" : ""}`}
                />
              </p>
            </div>
            <div
              className={`accordionContent ${
                activeIndex === 1 ? "active" : ""
              }`}
            >
              {/* {item.content} */}
              <p className="not">
                {googleCalendar
                  ? `Подключен  ${googleCalendar}`
                  : "Отсутствует"}
              </p>
              <span
                className="connect-google"
                onClick={() => handleCalendarConnect()}
              >
                {googleCalendar ? "Отключить" : "Подключить"}
              </span>
            </div>
          </div>
          {/* item3 */}
          <div className="accordionItem">
            <div
              className={`accordionHeader`}
              onClick={() => toggleAccordion(2)}
            >
              <p className="calendar">
                Bitrix24{" "}
                <img
                  src="/up_icon.svg"
                  alt="icon"
                  className={` ${activeIndex === 2 ? "active" : ""}`}
                />
              </p>
            </div>
            <div
              className={`accordionContent ${
                activeIndex === 2 ? "active" : ""
              }`}
            >
              <form>
                <input
                  type="email"
                  placeholder={user?.email || "Никнейм"}
                  name="email"
                  value={editUser?.email || ""}
                  className="form__input"
                />

                <button className="btn btn-primary">Сохранить</button>
              </form>
            </div>
          </div>
          {/* item4 */}
          <div className="accordionItem">
            <div
              className={`accordionHeader`}
              onClick={() => toggleAccordion(3)}
            >
              <p className="calendar">
                AmoCRM{" "}
                <img
                  src="/up_icon.svg"
                  alt="icon"
                  className={` ${activeIndex === 3 ? "active" : ""}`}
                />
              </p>
            </div>
            <div
              className={`accordionContent ${
                activeIndex === 3 ? "active" : ""
              }`}
            >
              {/* {item.content} */}
              <a className="nav__link" href="#!">
                Перейти на сайт
              </a>
            </div>
          </div>
        </div>

        <div className="settings-item__btn">
          <p className="api-key">API key</p>
          {/* <p className="key">{user?.api_key}</p> */}

          <CopyText text={user?.api_key} />
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
                pay?.map((payme, i) => (
                  <tr key={i}>
                    <td>{payme.payment_id}</td>
                    <td>
                      {moment(payme.purchased_at).format(
                        "MMMM Do YYYY, h:mm:ss "
                      )}
                    </td>
                    <td>Оплачено</td>
                    <td>{payme.plan_price} ₽</td>
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
