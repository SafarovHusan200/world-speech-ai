"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import { signIn } from "next-auth/react";

import { useRouter } from "next/navigation";
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
  const [error, setError] = useState();

  const router = useRouter();
  const onFinish = async (values) => {
    const { email, password } = values;
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    console.log(result);

    if (result.error) {
      message.error("Login eror");
      setError(result.error);
    } else {
      message.success("Login success");
      router.push("/dashboard");
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

              <p className="login__block--content__descr">Добро пожаловать</p>

              <button
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
                    htmlType="submit"
                    className="btn-primary"
                  >
                    Продолжить с почтой
                  </Button>
                </Form.Item>
              </Form>

              <div className="have__got--account">
                <p>
                  Еще нет аккаунта? -
                  <Link href={"/auth/register"}> Создать</Link>
                </p>
              </div>

              <div className="offer__and__policy">
                <Link href={"/forgot"}>Не помню пароль</Link>
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
