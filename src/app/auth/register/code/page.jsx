"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import "../../../../styles/login.css";
import { useRouter } from "next/navigation";
import { Button, Form, Input, message } from "antd";
import CountdownTimer from "@/components/CountdownTimer";
import { useAuth } from "@/app/hooks/context/AuthContext";
import { useMutation } from "@tanstack/react-query";

import axios from "axios";

const Code = () => {
  const router = useRouter();
  const { email } = useAuth();

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
        if (err?.response.data?.email) message.error(err?.response.data?.email);
        if (err?.response.data?.password)
          message.error(err?.response.data?.password);
        throw err.response.data;
      }
    },
    onSuccess: (response) => {
      if (response.status === 201) {
        router.push("/auth/register/code");
      }
    },
  });

  const onFinish = async (values) => {
    const { code } = values;

    console.log(email);
    console.log(code);
    if (email && code) {
      try {
        const res = await axios.post(
          "https://worldspeechai.com/api/v1/users/activate_account/",
          { email, code }
        );

        console.log(res);
        if (res.status === 200) {
          message.success("activate succussfully🎉");
          router.push("/auth/login");
        }
      } catch (error) {
        console.log(error);
        if (error.response.data?.error)
          message.error(error.response.data.error);
        if (error.response.data?.code) message.error(error.response.data.code);
        if (error.response.data?.email)
          message.error(error.response.data.email);

        // router.push("/auth/register/password");
      }
    } else {
      message.error("Пожалуйста, введите email");
      router.push("/auth/register");
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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

              <p className="login__block--content__descr">
                Мы отправили код подтверждения на вашу почту
              </p>

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
                  className="code"
                  name="code"
                  rules={[
                    {
                      required: true,
                      message: "Пожалуйста, введите свой код!",
                    },
                  ]}
                >
                  <Input placeholder="Код" />
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
                    Продолжить
                  </Button>
                </Form.Item>
              </Form>

              <div className="have__got--account">
                <p>
                  Не пришел код? - <CountdownTimer />
                  {/* <Link href={"/auth/register"}>Создать</Link> */}
                </p>
              </div>

              {/* ============ */}

              <div className="offer__and__policy code">
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
    </div>
  );
};

export default Code;
