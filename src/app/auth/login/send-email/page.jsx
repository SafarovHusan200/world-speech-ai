import React from "react";

const SendEmailMessage = () => {
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

              <form className="login__form">
                <input
                  type="email"
                  className="form__input"
                  placeholder="Почта"
                />

                <button className="btn-primary send-email__btn">
                  Продолжить
                </button>
              </form>

              {/* ============ */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendEmailMessage;
