import Link from "next/link";
import React from "react";

const RegisterContent = () => {
  return (
    <>
      <p className="register__block--content__descr">
        Приветствуем! Здесь можно авторизоваться <br /> или создать учетную
        запись, если у вас ее еще нет
      </p>

      <button className="with__google">
        <img src="/google-icon.svg" alt="" />
        <span>Войти через Google</span>
      </button>
      <p className="or">или</p>
      <form className="register__form">
        <input type="email" className="form__input" placeholder="Почта" />

        <button className=" btn-primary">Продолжить с почтой</button>
      </form>

      <div className="have__got--account">
        <p>
          Уже есть аккаунт? - <Link href={"/auth/login"}>Войти</Link>
        </p>
      </div>
    </>
  );
};

export default RegisterContent;
