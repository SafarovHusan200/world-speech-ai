"use client";

import React from "react";
import "../../../../styles/login.css";
import { Alert, Button, Form, Input, message } from "antd";
import axios from "axios";
import { useAuth } from "@/app/hooks/context/AuthContext";
import { useRouter } from "next/navigation";

const ForgotPassword = () => {
  const router = useRouter();

  const { email, setEmail } = useAuth();

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
    const { code, password, password2 } = values;
    if (password !== password2) {
      return message.warning("Passwords do not match");
    }

    try {
      const res = await axios.post(
        "https://worldspeechai.com/api/v1/users/password_recovery/",
        { email, code, new_password: password }
      );

      if (res.status === 200) {
        message.success("Profile activated🎉");
        router.push("/auth/login");
      }
    } catch (error) {
      handleErrorResponse(error, code, password);
    }
  };

  const handleErrorResponse = async (error, code, password) => {
    const errorMessage =
      error.response?.data?.email ||
      error.response?.data?.error ||
      "An error occurred";
    await message.error(errorMessage);
    console.log("error", error);

    if (!email) {
      const currentEmail = prompt("Email:");
      if (currentEmail) {
        setEmail(currentEmail);
        retryPasswordRecovery(currentEmail, code, password);
      }
    }
  };

  const retryPasswordRecovery = async (email, code, password) => {
    try {
      const res = await axios.post(
        "https://worldspeechai.com/api/v1/users/password_recovery/",
        { email, code, new_password: password }
      );
      if (res.status === 200) {
        message.success("Profile activated🎉");
        router.push("/auth/login");
      }
    } catch (retryError) {
      const retryErrorMessage =
        retryError.response?.data?.error || "An error occurred";
      await message.error(retryErrorMessage);
      console.log("retryError", retryError);
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
                Мы отправили проверочный код Вам на почту, введите для
                восстановления
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
                  name={"code"}
                  rules={[
                    {
                      required: true,
                      message: "Пожалуйста, введите свой код",
                    },
                  ]}
                >
                  <Input placeholder="Код" />
                </Form.Item>

                <p className="new-password-descr">Придумайте новый пароль</p>
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
                  // label="Password"
                  name="password2"
                  rules={[
                    {
                      required: true,
                      message: "Пожалуйста, введите свой пароль!",
                    },
                  ]}
                >
                  <Input.Password placeholder="Подтверждение пароля" />
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
                    Продолжить с почтой
                  </Button>
                </Form.Item>
              </Form>

              {/* ============ */}

              <div className="offer__and__policy password">
                <p>
                  Возникли проблемы? Напишите нам{" "}
                  <a href="mailto:company@worldspeechai.com">
                    company@worldspeechai.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
