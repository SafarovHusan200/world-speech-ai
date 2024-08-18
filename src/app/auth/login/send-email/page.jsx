"use client";

import { useAuth } from "@/app/hooks/context/AuthContext";
import { Button, Form, Input, message } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SendEmailMessage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { setEmail } = useAuth();

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
    setEmail(values.email);
    setLoading(true);

    try {
      const res = await axios.post(
        "https://worldspeechai.com/api/v1/users/send_recovery_code/",
        { email: values.email }
      );

      if (res.status === 200) {
        message.success("code send email ");
        router.push("/auth/login/forgot");
        setLoading(false);
      }
    } catch (error) {
      message.error(error.response?.data?.email[0]);

      setLoading(false);
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
                Введите привязанный email
              </p>

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
                    Продолжить
                  </Button>
                </Form.Item>
              </Form>

              {/* ============ */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendEmailMessage;
