import React from "react";

const RegisterUsernameContent = () => {
  return (
    <>
      <p className="register__block--content__descr">
        Придумайте надежный пароль
      </p>

      <form className="register__form" method="POST">
        <input
          type="text"
          name="username"
          className="form__input"
          placeholder="Никнейм"
        />

        <button className=" btn-primary password">Зарегистрироваться</button>
      </form>
    </>
  );
};

export default RegisterUsernameContent;
