import Link from "next/link";
import React from "react";

const RegisterPasswordContent = () => {
  return (
    <>
      <p className="register__block--content__descr">
        Придумайте надежный пароль
      </p>

      <form className="register__form">
        <input
          type="password"
          name="password1"
          className="form__input"
          placeholder="Пароль"
        />
        <input
          type="password"
          name="password2"
          className="form__input"
          placeholder="Подтверждение пароля"
        />

        <button className=" btn-primary password">Продолжить</button>
      </form>
    </>
  );
};

export default RegisterPasswordContent;
