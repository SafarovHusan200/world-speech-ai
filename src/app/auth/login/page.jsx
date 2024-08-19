"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { PoweroffOutlined } from "@ant-design/icons";
import { signIn } from "next-auth/react";

import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuth } from "@/app/hooks/context/AuthContext";
import useHttp from "@/app/hooks/useHttp";
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

const Login = () => {
  const { setEmail } = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { request } = useHttp();

  const onFinish = async (values) => {
    setLoading(true);
    const { email, password } = values;
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (
      result.status >= 400 &&
      result.error === "Incorrect username or password."
    ) {
      message.error(result.error);
      setLoading(false);
    } else if (
      result.status >= 400 &&
      result.error === "Account is not active."
    ) {
      message.warning(result.error);

      try {
        const res = await axios.post(
          "https://worldspeechai.com/api/v1/users/send_activation_code/",
          { email }
        );
        console.log(res);
        if (res.status === 200) {
          setEmail(email);
          setLoading(false);
          router.push("/auth/register/code");
        }
      } catch (error) {
        console.log(error);
        message.error(error.response.data.email);
        setLoading(false);
      }
    } else {
      setLoading(false);
      message.success("Login success");
      router.push("/dashboard");
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleLogin = async () => {
    const url =
      // "https://worldspeechai.com/api/v1/auth/o/google-oauth2/?redirect_uri=https://worldspeechai.com/api/v1/auth/o/google-oauth2/";
      "https://worldspeechai.com/api/v1/auth/o/google-oauth2/?redirect_uri=https://world-speech-ai.netlify.app/api/auth/callback/google";
    try {
      request(url, "GET")
        .then((response) => {
          console.log(response);
          window.location.href = response.authorization_url;
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="login">
      <div className="container">
        <div className="container">
          <div className="login__block">
            <div className="login__block--content">
              <div className="login__block--content__logo">
                <img src="/logo.svg" alt="logo" />
                <span>WorldspeechAI</span>
              </div>

              {/* =========== */}

              <p className="login__block--content__descr">Добро пожаловать</p>

              <button className="with__google" onClick={() => handleLogin()}>
                <img src="/google-icon.svg" alt="" />
                <span>Войти через Google</span>
              </button>
              {/* <button
                className="with__google"
                onClick={() =>
                  signIn("google", {
                    callbackUrl:
                      "https://worldspeechai.com/api/v1/auth/o/google-oauth2/",
                  })
                }
              >
                <img src="/google-icon.svg" alt="" />
                <span>Войти через Google</span>
              </button> */}

              <p className="or">или</p>

              {/* =================== */}

              <Form
                name="basic"
                labelCol={{
                  span: 10,
                }}
                wrapperCol={{
                  span: 16,
                }}
                style={{
                  maxWidth: 800,
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
                  // label="Username"
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
                  // label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Пожалуйста, введите свой пароль!",
                    },
                  ]}
                >
                  <Input.Password placeholder="Пароль" />
                </Form.Item>

                <Form.Item
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
                >
                  <Button
                    type="primary"
                    loading={loading}
                    htmlType="submit"
                    className="btn-primary"
                  >
                    Продолжить с почтой
                  </Button>
                </Form.Item>
              </Form>

              {/* ======================= */}

              <div className="have__got--account">
                <p>
                  Еще нет аккаунта? -
                  <Link href={"/auth/register"}> Создать</Link>
                </p>
              </div>

              <div className="offer__and__policy">
                <Link href={"/auth/login/send-email"}>Не помню пароль</Link>
              </div>
              {/* ============ */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
