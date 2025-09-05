import { useState } from "react";
import { Link } from "react-router-dom";
import "./Info.css";
const StatInfo = () => {
  return (
    <div className="info_wrapper">
      <h2 className="info-title">Статистика</h2>
      <div className="info-image3" />

      <div className="info-description">
        <p>
          В личном кабинете ты можешь следить за своим прогрессом: сколько слов
          ты уже выучил всего и за каждый день.
        </p>
        <p>Подробная статистика твоих достижений, изученных слов и ошибок</p>
        <p>Отслеживай свой прогресс в индивидуальной статистике!</p>
        <p>Cтавь цели! </p>
        <p>Вдохновляйся на достижение новых результатов каждый день!</p>
      </div>
      <Link className="arrow-back" to="/" />
    </div>
  );
};

export default StatInfo;
