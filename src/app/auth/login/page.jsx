"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button, Form, Input, message } from "antd";

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

  const router = useRouter();
  const { request, loading, error } = useHttp();

  const onFinish = async (values) => {
    console.log("start");
    const { email, password } = values;
    const result = await request(
      "https://worldspeechai.com/api/v1/auth/jwt/create/",
      "POST",
      {
        email,
        password,
      }
    );

    console.log("res => ", result);
    const err = (!result && error) || null;

    if (err === "Account is not active.") {
      message.warning(err);

      try {
        const res = await axios.post(
          "https://worldspeechai.com/api/v1/users/send_activation_code/",
          { email }
        );
        console.log(res);
        if (res.status === 200) {
          setEmail(email);

          router.push("/auth/register/code");
        }
      } catch (error) {
        console.log(error);
        message.error(error);
      }
    } else if (err) {
      message.error(err);
    } else {
      if (result && result.access && result.refresh) {
        // Tokenni localStorage-ga saqlash
        localStorage.setItem("token", JSON.stringify(result.access));
        localStorage.setItem("refresh", JSON.stringify(result.refresh));
        localStorage.setItem("isLogin", JSON.stringify(true));
      } else {
        message.error(result);
        return err;
      }
      message.success("Login success");
      router.push("/dashboard");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleLogin = async () => {
    const url =
      "https://worldspeechai.com/api/v1/auth/o/google-oauth2/?redirect_uri=https://worldspeechai.com/auth/login";
    try {
      request(url, "GET")
        .then((response) => {
          console.log(response, "success");
          window.location.href = response.authorization_url;
        })
        .catch((err) => {
          console.log(err, "error");
        });
    } catch (err) {
      console.log(err, "err 2");
    }
  };

  useEffect(() => {
    const currentUrl = window.location.href;

    // 'state' dan boshlab hamma narsani olamiz
    const stateIndex = currentUrl.indexOf("state="); // 'state=' qayerdan boshlanishini topamiz

    if (stateIndex !== -1) {
      const state = currentUrl.substring(stateIndex);
      axios
        .post("https://worldspeechai.com/api/v1/auth/o/google-oauth2/?" + state)
        .then((response) => {
          console.log("Server Response:", response.data);

          if (response.data.access && response.data.refresh) {
            localStorage.setItem("token", JSON.stringify(response.data.access));
            localStorage.setItem(
              "refresh",
              JSON.stringify(response.data.refresh)
            );
            localStorage.setItem("isLogin", JSON.stringify(true));
            router.push("/dashboard");
          }
        })
        .catch((err) => {
          console.error("Request Error:", err);
        });
    }
  }, []);

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
