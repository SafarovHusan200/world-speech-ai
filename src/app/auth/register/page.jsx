"use client";
import Link from "next/link";
import React, { useState } from "react";
import "../../../styles/register.css";
import { useAuth } from "@/app/hooks/context/AuthContext";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";
import axios from "axios";
import useHttp from "@/app/hooks/useHttp";

const Register = () => {
  const router = useRouter();
  const { setEmail } = useAuth();
  const [loading, setLoading] = useState(false);
  const { request, err } = useHttp();

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

  const onFinish = async (values) => {
    setLoading(true);
    setEmail(values.email);

    router.push("/auth/register/password");
    setLoading(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const getSessionId = async () => {
    try {
      const response = await fetch(
        "https://worldspeechai.com/api/v1/auth/o/google-oauth2/?redirect_uri=https://world-speech-ai.netlify.app/api/auth/callback/google",
        {
          method: "GET",
          credentials: "include", // Bu qator cookie'larni avtomatik ravishda qo'shadi va javobdan olishga imkon beradi
        }
      );

      // Barcha sarlavhalarni olish
      const headers = response.headers;

      // 'set-cookie' sarlavhasidan sessionid olish
      const cookies = headers.get("set-cookie");
      console.log("headers", headers);
      console.log(cookies); // Bu yerda siz 'set-cookie' sarlavhasidagi barcha cookie'larni ko'rishingiz mumkin

      // Cookie ichidan sessionid ni ajratish
      const sessionId = cookies
        ?.split(";")
        .find((cookie) => cookie.trim()?.startsWith("sessionid="))
        ?.split("=")[1];

      console.log("Session ID:", sessionId);
    } catch (error) {
      console.error("Error fetching the session ID:", error);
    }
  };

  const handleGoogle = () => {
    const url =
      // "https://worldspeechai.com/api/v1/auth/o/google-oauth2/?redirect_uri=https://worldspeechai.com/api/v1/auth/o/google-oauth2/";
      "https://worldspeechai.com/api/v1/auth/o/google-oauth2/?redirect_uri=https://world-speech-ai.netlify.app/auth/login";
    try {
      request(url, "GET")
        .then((response) => {
          // console.log(response, "success");
          // window.location.href = response.authorization_url;
          getSessionId();
        })
        .catch((err) => {
          console.log(err, "error");
        });
    } catch (err) {
      console.log(err, "err 2");
    }
  };

  return (
    <div className="register">
      <div className="container">
        <div className="register__block">
          <div className="register__block--content">
            <div className="register__block--content__logo">
              <img src="/logo.svg" alt="logo" />
              <span>WorldspeechAI</span>
            </div>

            {/* =========== */}

            {/* <RegisterContent /> */}

            <p className="register__block--content__descr">
              Приветствуем! Здесь можно авторизоваться <br /> или создать
              учетную запись, если у вас ее еще нет
            </p>

            <button className="with__google" onClick={() => handleGoogle()}>
              <img src="/google-icon.svg" alt="" />
              <span>Войти через Google</span>
            </button>
            <p className="or">или</p>

            <Form
              name="basic"
              labelCol={{
                span: 10,
              }}
              wrapperCol={{
                span: 16,
              }}
              initialValues={{
                remember: true,
              }}
              validateMessages={validateMessages}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                name={"email"}
                rules={[
                  {
                    type: "email",
                    required: true,
                    message:
                      "Пожалуйста, введите свой адрес электронной почты!",
                  },
                ]}
              >
                <Input placeholder="Почта" />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  className="btn btn-primary"
                  loading={loading}
                >
                  Продолжить с почтой
                </Button>
              </Form.Item>
            </Form>

            <div className="have__got--account">
              <p>
                Уже есть аккаунт? - <Link href={"/auth/login"}>Войти</Link>
              </p>
            </div>

            {/* ============ */}

            <div className="offer__and__policy">
              <p>Регистрируясь, вы соглашаетесь с </p>
              <p>
                <Link href={"/offer"}>Офертой</Link>
                <span> и </span>

                <Link href={"/policy"}>Политикой конфиденциальности</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
