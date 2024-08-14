import Link from "next/link";
import React from "react";
import "../../../../styles/login.css";

const ForgotPassword = () => {
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

              <form className="login__form">
                <input type="text" className="form__input" placeholder="Код" />
                <p className="new-password-descr">Придумайте новый пароль</p>
                <input
                  type="password"
                  className="form__input"
                  placeholder="Пароль"
                />
                <input
                  type="password"
                  className="form__input"
                  placeholder="Подтверждение пароля"
                />

                <button className="btn btn-primary">Продолжить с почтой</button>
              </form>

              <div className="have__got--account">
                <p>
                  Еще нет аккаунта? -
                  <Link href={"/auth/register"}>Создать</Link>
                </p>
              </div>

              {/* ============ */}

              <div className="offer__and__policy">
                <Link href={"/forgot"}>Не помню пароль</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
