import Link from "next/link";
import React from "react";
import "../../styles/cooperation.css";

const Cooperation = () => {
  return (
    <div className="cooperation">
      <div className="cooperation__block">
        <div className="cooperation__block--content">
          <div>
            <div className="cooperation__block--content__name">
              Сотрудничество
            </div>
            <div className="cooperation__block--content__descr">
              Чтобы связаться с нами, заполните форму и наши менеджеры ответят
              Вам в течении 15 минут. Или напишите нам на почту{" "}
              <a href="mailto:company@worldspeechai.com">
                company@worldspeechai.com
              </a>
            </div>
            <form className="cooperation__block--content__form">
              <input type="text" placeholder="Имя" name="name" />
              <input type="email" placeholder="Почта" name="email" />

              <textarea
                name="message"
                id=""
                cols="30"
                rows="10"
                placeholder="Сообщение"
              ></textarea>

              <button className="btn btn-primary">Продолжить</button>
            </form>
          </div>

          <div className="row">
            <p>
              Нажимая “Отправить”, вы соглашаетесь с <br />
              <Link href={"/offer"}>Офертой</Link> и{" "}
              <Link href={"/policy"}>Политикой конфиденциальности</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cooperation;
