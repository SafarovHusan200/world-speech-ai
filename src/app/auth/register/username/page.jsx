"use client";

import Link from "next/link";
import React, { useEffect } from "react";

import "../../../../styles/register.css";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/hooks/context/AuthContext";
import { Button, Form, Input, message } from "antd";
import axios from "axios";

import { useMutation, useQuery } from "@tanstack/react-query";

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

  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: async (data) => {
      try {
        const response = await axios.post(data.url, data.body, {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        console.log("res", response);

        return response;
      } catch (err) {
        if (err?.response.data?.email) {
          message.error(err?.response.data?.email);

          console.log(err?.response.data?.email);
          if (
            err?.response.data?.email[0] ===
            "Пользователь с таким Email уже существует."
          ) {
            router.push("/auth/login");
          } else {
            router.push("/auth/register");
          }
        }
        if (err?.response.data?.password) {
          err?.response.data?.password.map((err) => {
            message.error(err);
          });
          router.push("/auth/register/password");
        }
        throw err.response.data;
      }
    },

    onSuccess: (response) => {
      if (response.status === 201) {
        message.success("Congratulations🎉. send code email address ");
        router.push("/auth/register/code");
      }
    },
  });

  const onFinish = (values) => {
    const { username } = values;
    const isUsername = username.split(" ").length === 1;

    if (username && isUsername) {
      setUsername(username);

      if (email && password) {
        mutate({
          url: "https://worldspeechai.com/api/v1/users/",
          token: JSON.parse(localStorage.getItem("token")), // Replace this with the actual token if needed
          body: { email, password, username },
        });
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
                  loading={isPending}
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
