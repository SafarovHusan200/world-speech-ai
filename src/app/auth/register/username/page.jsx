"use client";

import Link from "next/link";
import React, { useEffect } from "react";

import "../../../../styles/register.css";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/hooks/context/AuthContext";
import { Button, Form, Input, message } from "antd";
import axios from "axios";
import useHttp from "@/app/hooks/useHttp";

const RegisterUsername = () => {
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

  const { setUsername, password, email } = useAuth();

  const router = useRouter();

  const { sendRequest, isLoading, error } = useHttp();

  // const onFinish = async (values) => {
  //   const { username } = values;

  //   const isUsername = username.split(" ").length === 1;

  //   if (username && isUsername) {
  //     setUsername(username);

  //     if (email && password) {
  //       console.log(email);
  //       console.log(password);
  //       console.log(username);

  //       const response = await axios.post(
  //         "https://worldspeechai.com/api/v1/users/",
  //         {
  //           email,
  //           password,
  //           username,
  //         }
  //       );

  //       console.log(response);

  //       if (response.status === 201) {
  //         message.success("Поздравляем регистрация прошла успешно");
  //       } else {
  //         message.error("error");
  //       }
  //     } else {
  //       message.error("no");
  //     }

  //     // router.push("/auth/register/username");
  //   } else {
  //     message.error("неправильный пароль");
  //   }
  // };

  const onFinish = async (values) => {
    const { username } = values;

    const isUsername = username.split(" ").length === 1;

    if (username && isUsername) {
      setUsername(username);

      if (email && password) {
        console.log(email);
        console.log(password);
        console.log(username);

        sendRequest(
          {
            url: "https://worldspeechai.com/api/v1/users/",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: {
              email,
              password,
              username,
            },
          },
          (data) => {
            console.log(data);
            if (data.id) {
              message.success("Поздравляем регистрация прошла успешно");
              router.push("/auth/login");
            } else {
              message.error("Ошибка при регистрации");
            }
          }
        );
      } else {
        message.error("Пожалуйста, введите email и пароль");
      }
    } else {
      message.error("Неправильное имя пользователя");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if (!email) {
      router.push("/auth/register");
    } else if (!password) {
      router.push("/auth/register/password");
    }
  });
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
                // label="Password"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Пожалуйста, введите свой никнейм!",
                  },
                ]}
              >
                <Input placeholder="Никнейм" />
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
                  className="btn-primary"
                >
                  Зарегистрироваться
                </Button>
              </Form.Item>
            </Form>

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

export default RegisterUsername;
