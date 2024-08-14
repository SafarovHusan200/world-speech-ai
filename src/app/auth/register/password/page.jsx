"use client";

import RegisterPasswordContent from "@/components/registerPasswordContent";
import Link from "next/link";
import React, { useEffect } from "react";
import "../../../../styles/register.css";
import { useRouter } from "next/navigation";
import { Button, Form, Input, message } from "antd";
import { useAuth } from "@/app/hooks/context/AuthContext";

const RegisterPassword = () => {
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
  const { email, setPassword } = useAuth();
  const router = useRouter();
  const onFinish = async (values) => {
    const { password, password2 } = values;

    if (password && password2 && password === password2) {
      setPassword(password);

      router.push("/auth/register/username");
    } else {
      message.error("неправильный пароль");
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if (!email) {
      router.push("/auth/register");
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

            {/* <RegisterPasswordContent /> */}

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
                    message: "Пожалуйста,повторите введите свой пароль!",
                  },
                ]}
              >
                <Input.Password placeholder="Повторите пароль" />
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

export default RegisterPassword;
