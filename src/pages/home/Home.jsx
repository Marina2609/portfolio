import { useState } from "react";
import { Link } from "react-router-dom";

import "./Home.css";

const Home = () => {
  return (
    <main className="page-home">
      <div className="page-home__overlay">
        <h2 className="page-home__overlay-heading">Преимущества</h2>
        <div className="page-home__container">
          <article className="content-card">
            <h3 className="content-card__heading">Словарь</h3>
            <ul className="content-card__list--no-space ">
              <li className="content-card__list">
                Граммотная сортировка слов:{" "}
              </li>
              <li className="content-card__list">-по уровню сложности</li>
              <li className="content-card__list">-по изученности</li>
              <li className="content-card__list">Транскрипция</li>
              <li className="content-card__list">Аудиосопровождение</li>
            </ul>
            <p className="content-card__link">
              <Link to="/bookInfo">Подробнее &raquo;</Link>
            </p>
          </article>
          <article className="content-card">
            <h3 className="content-card__heading">Статистика</h3>
            <ul className="content-card__list--no-space ">
              <li className="content-card__list">
                Простматривай свой прогресс изучения:
              </li>
              <li className="content-card__list">
                -количество новых слов за день
              </li>
              <li className="content-card__list">
                -количество изученных слов за день
              </li>
              <li className="content-card__list">
                -процент правильных ответов за день
              </li>
            </ul>
            <p className="content-card__link">
              <Link to="/statInfo">Подробнее &raquo;</Link>
            </p>
          </article>
          <article className="content-card">
            <h3 className="content-card__heading">Игры </h3>
            <ul className="content-card__list--no-space ">
              <li className="content-card__list">
                Сделайте изучение слов более увлекательным:
              </li>
              <li className="content-card__list">- уровни сложности</li>
              <li className="content-card__list">- улучшение запоминания</li>
              <li className="content-card__list">
                - восприятие на слух и навыки перевода
              </li>
            </ul>
            <p className="content-card__link">
              <Link to="/gameInfo">Подробнее &raquo;</Link>
            </p>
          </article>
        </div>
      </div>

      {/* <Menu menuActive={menuActive} setMenuActive={setMenuActive} /> */}
    </main>
  );
};

export default Home;
