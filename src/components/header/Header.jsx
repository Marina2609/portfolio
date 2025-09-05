import { useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import BurgerMenu from "../burgerMenu/BurgerMenu";

import "./Header.css";

const Header = (props) => {
  const { group, page } = useParams();
  const [isAuth, setIsAuth] = useState(props);
  const [menuActive, setMenuActive] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (token !== null && userId !== null) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, []);

  return (
    <header className="row">
      <div className="header">
        <h1 className="header__logo header__shadow">
          <Link to="/">RSLang</Link>
        </h1>
        <div className="header__greeting header__shadow">
          {isAuth ? (
            <p>Приветствуем Вас, {localStorage.getItem("name")}!</p>
          ) : (
            <p>Приветствуем Вас!</p>
          )}
        </div>
        <nav className="header__menu">
          <ul>
            <li>
              <NavLink to="/">Главная</NavLink>
            </li>

            <li>
              <NavLink to="/book/1/1">Учебник</NavLink>
              <ul>
                <li>
                  <NavLink to="/book/1/1">Раздел 1</NavLink>
                </li>
                <li>
                  <NavLink to="/book/2/1">Раздел 2</NavLink>
                </li>
                <li>
                  <NavLink to="/book/3/1">Раздел 3</NavLink>
                </li>
                <li>
                  <NavLink to="/book/4/1">Раздел 4</NavLink>
                </li>
                <li>
                  <NavLink to="/book/5/1">Раздел 5</NavLink>
                </li>
                <li>
                  <NavLink to="/book/6/1">Раздел 6</NavLink>
                </li>
              </ul>
            </li>

            <li>
              <NavLink
                to={group && page ? `/games/${group}/${page}` : "/games"}
              >
                Игры
              </NavLink>
              <ul>
                <li>
                  <NavLink
                    to={
                      group && page
                        ? `/audioGame/${group}/${page}`
                        : "/audioGame"
                    }
                  >
                    Аудиовызов
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={group && page ? `/sprint/${group}/${page}` : "/sprint"}
                  >
                    Спринт
                  </NavLink>
                </li>
              </ul>
            </li>

            <li>
              {isAuth ? (
                <NavLink to="/statistics">
                  {localStorage.getItem("name")}
                </NavLink>
              ) : (
                <NavLink to="/authorization">Войти</NavLink>
              )}
            </li>

            <li>
              {isAuth && (
                <Link
                  to="/"
                  onClick={() => {
                    localStorage.clear();
                    setIsAuth(false);
                  }}
                >
                  Выйти
                </Link>
              )}
            </li>
          </ul>
        </nav>
        <BurgerMenu menuActive={menuActive} setMenuActive={setMenuActive} />
        <div
          className="burger-menu"
          role="presentation"
          onClick={() => setMenuActive(!menuActive)}
        >
          <span />
        </div>
      </div>
    </header>
  );
};

export default Header;
