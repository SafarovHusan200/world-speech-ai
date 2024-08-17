import { useState, useEffect } from "react";
import Link from "next/link"; // Next.js Link komponenti

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(300); // 5 daqiqa = 300 soniya

  useEffect(() => {
    // Har 1 soniyada yangilanish uchun interval o'rnatamiz
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    // Komponent unmounted bo'lganda intervalni tozalaymiz
    return () => clearInterval(interval);
  }, []);

  // Vaqtni formatlash funktsiyasi (MM:SS formatida)
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      remainingSeconds < 10 ? "0" : ""
    }${remainingSeconds}`;
  };

  return (
    <>
      {timeLeft > 0 ? (
        <span className="time">{formatTime(timeLeft)}</span>
      ) : (
        <Link className="link" href="/auth/register">
          Отправить еще раз код
        </Link>
      )}
    </>
  );
};

export default CountdownTimer;
