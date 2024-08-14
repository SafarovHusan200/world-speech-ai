import React from "react";
import "../styles/safety.css";
import SafetyCard from "@/components/Safety__card";
import SafetyCardWidthBg from "@/components/Safety__card__width__bg";

const Safety = () => {
  return (
    // Safety => Безопасность => Xavfsizlik
    <section className="safety" id="safety">
      <div className="container">
        <h2 className="section-title">
          Безопасность ваших данных и конфиденциальность
        </h2>
        <div className="section-descr">
          Конфиденциальностьклиентов является нашим приоритетом на каждом этапе
          работы. Мы внедрили передовые технологии и строгие протоколы защиты
          данных, чтобы обеспечить постоянную безопасность вашей информации.
        </div>
        <div className="safety__row">
          <div className="safety__row--item__cards">
            <SafetyCard
              img={"/database.svg"}
              title={"Хранение данных"}
              description={`Все данные, включая аудио и видеозаписи встреч, транскрипты,        файлы-резюме и отчёты, хранятся на защищённых серверах WorldspeechAI. Мы        используем современные методы шифрования для защиты данных в покое и в        процессе передачи.`}
            />
            <SafetyCard
              img={"/clipboard-data.svg"}
              title={"Обработка данных"}
              description={`WorldspeechAI обрабатывает данные исключительно для предоставления услуг транскрибирования, создания суммари встреч и формирования отчётов. Данные не используются или передаются третьим лицам без согласия пользователя.`}
            />
            <SafetyCard
              img={"/binary-tree.svg"}
              title={"Доступ к данным "}
              description={`Доступ к данным имеют только авторизованные сотрудники WorldspeechAI, необходимые для поддержки и обеспечения работоспособности сервиса, такие как системные администраторы и техническая поддержка. Все сотрудники обязуются соблюдать строгие правила конфиденциальности и безопасности.`}
            />
            <SafetyCard
              img={"/brand-nem.svg"}
              title={"Защита от внешних угроз "}
              description={`Мы применяем меры защиты от киберугроз, такие как многоуровневая аутентификация, системы мониторинга безопасности и регулярные аудиты для обеспечения безопасности системы.`}
            />
          </div>

          <div className="safety__row--item__bg">
            <SafetyCardWidthBg title={"Онлайн решение"} bg={"/nout.svg"} />
          </div>
        </div>
        <div className="safety__row">
          <div className="safety__row--item__bg">
            <SafetyCardWidthBg
              title={"Коробочное решение"}
              bg={"/audio-v-text.svg"}
            />
          </div>

          <div className="safety__row--item__cards">
            <SafetyCard
              img={"/building.svg"}
              title={"Установка в офисе клиента"}
              description={`В случае коробочного решения все данные и программное обеспечение устанавливаются на серверах клиента. WorldspeechAI не имеет доступа к этим данным после установки. Клиент самостоятельно обеспечивает безопасность своих данных и контролирует доступ к ним.`}
            />
            <SafetyCard
              img={"/database-cog.svg"}
              title={"Управление данными клиента"}
              description={`Клиент полностью ответственен за управление данными и их защиту в рамках внутренних политик и стандартов безопасности.`}
            />
            <SafetyCard
              img={"/database-cog.svg"}
              title={"Управление данными клиента"}
              description={`Клиент полностью ответственен за управление данными и их защиту в рамках внутренних политик и стандартов безопасности.`}
            />
            <SafetyCard
              img={"/database-cog.svg"}
              title={"Управление данными клиента"}
              description={`Клиент полностью ответственен за управление данными и их защиту в рамках внутренних политик и стандартов безопасности.`}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Safety;
