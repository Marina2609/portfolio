import { useState } from "react";
import { Link } from "react-router-dom";
import "./Info.css";

const GameInfo = () => {
  return (
    <div className="info_wrapper">
      <h2 className="info-title">Игры</h2>
      <div className="info-image2" />
      <div className="info-description">
        <p>Игры сделают изучение слов более увлекательным и продуктивным:</p>
        <p>- игровой процесс влияет на улучшение запоминания</p>
        <p>- развивают восприятие на слух и навыки перевода</p>
        <p>- можно выбрать один из шести уровней сложности</p>
        <p>
          Если размещённых на странице слов для игры недостаточно, задействуются
          слова с предыдущих страниц, закрепляя знания.{" "}
        </p>
        <p>
          Игра “Аудиовызов” поможет тебе разить навыки аудирования и перевода.
        </p>
        <p>В Игре “Спринт” поможет развить навыки перевода. </p>
      </div>
      <Link className="arrow-back" to="/" />
    </div>
  );
};

export default GameInfo;
