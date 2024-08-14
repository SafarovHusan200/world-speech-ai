"use client";
import Link from "next/link";
import React from "react";
import "../../../styles/register.css";
import { useAuth } from "@/app/hooks/context/AuthContext";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";

const Register = () => {
  const router = useRouter();
  const { email, setEmail } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault(); // To'g'ri sintaksis
    console.log(email); // emailni ko'rsatish

    alert("true");
  };

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

    console.log(email);

    router.push("/auth/register/password");
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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

            <button className="with__google">
              <img src="/google-icon.svg" alt="" />
              <span>Войти через Google</span>
            </button>
            <p className="or">или</p>
            {/* <form className="register__form" onSubmit={handleSubmit}>
              <input
                type="email"
                className="form__input"
                placeholder="Почта"
                onChange={(e) => setEmail(e.target.value)}
                value={email} // Formada emailni ko'rsatish
              />

              <button type="submit" className="btn-primary">
                Продолжить с почтой
              </button>
            </form> */}

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
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  className="btn btn-primary"
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
