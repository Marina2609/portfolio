import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Service, { DataUserLoginResponse } from "../../../services/Service";
import PreLoaderCircle from "../../../components/preloader/PreLoaderCircle";
import "../LogIn.css";
import Header from "../../../components/header/Header";

const Authorization = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(true);
  const refEmail = useRef(null);
  const refPassword = useRef(null);
  const navigate = useNavigate();
  const [loginStatusMessage, setLoginStatusMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loader, setLoader] = useState(false);

  const closeFormHandler = (event) => {
    if (event.classList?.contains("page-logIn")) navigate("/");
  };
  const inputHandler = (event) => {
    const { id, value } = event.target;
    let isEmailValid = false;
    let isPasswordValid = false;
    switch (id) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }

    if (refEmail.current !== null) {
      isEmailValid = refEmail.current.validity.valid;
    }
    if (refPassword.current !== null) {
      isPasswordValid = refPassword.current.validity.valid;
    }

    if (isEmailValid && isPasswordValid) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    setLoginStatusMessage("");
    setDisabled(true);
    setLoader(true);
    const responseLogin = await Service.loginUser({ email, password });
    setLoader(false);
    setDisabled(false);
    if (!responseLogin) {
      setSuccess(false);
      setLoginStatusMessage(`Неверный Email или пароль!`);
      props.setIsAuth(false);
    } else {
      console.log(responseLogin);
      setSuccess(true);
      setLoginStatusMessage(`Вы успешно авторизовались!`);
      localStorage.setItem("token", responseLogin.token);
      localStorage.setItem("userId", responseLogin.userId);
      localStorage.setItem("name", responseLogin.name);
      props.setIsAuth(true);
      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 1500);
    }
  };
  return (
    <div className="wrapper-form" aria-hidden onClick={closeFormHandler}>
      <section id="content" className="content">
        <h1>Войти</h1>
        <div className="row">
          <form className="col s12" noValidate onSubmit={submitHandler}>
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">email</i>
                <input
                  ref={refEmail}
                  id="email"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  className="validate"
                  type="email"
                  required
                  onChange={inputHandler}
                />
                <label htmlFor="email">Email</label>
                <span className="helper-text" data-error="Email не валиден" />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">password</i>
                <input
                  ref={refPassword}
                  id="password"
                  className="validate"
                  type="password"
                  autoComplete="off"
                  minLength={8}
                  required
                  onChange={inputHandler}
                />
                <label htmlFor="password">Password</label>
                <span
                  className="helper-text"
                  data-error="Длина должна быть не менее 8 символов"
                />
                <PreLoaderCircle show={loader} />
                <span style={{ color: success ? "green" : "red" }}>
                  <b>{loginStatusMessage}</b>
                </span>
              </div>
            </div>
            <div className="control">
              <button
                disabled={disabled}
                className="btn waves-effect waves-light blue darken-1"
                type="submit"
                name="action"
              >
                Войти
                <i className="material-icons right">send</i>
              </button>
              <Link to="/registration">Регистрация</Link>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Authorization;
