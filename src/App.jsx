import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalContextProvider } from "./GlobalContext";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Book from "./pages/book/Book";
import Authorization from "./pages/logIn/authorization/Authorization";
import Registration from "./pages/logIn/registration/Registration";
import BookInfo from "./pages/info/BookInfo";
import GameInfo from "./pages/info/GameInfo";
import StatInfo from "./pages/info/StatInfo";
import Games from "./pages/games/Games";
import AudioGame from "./pages/games/audioGame/AudioGame";
import Sprint from "./pages/games/sprint/Sprint";
import Statistics from "./pages/statistics/Statistics";

function App() {
  const [menuActive, setMenuActive] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  return (
    <BrowserRouter>
      <GlobalContextProvider>
        <Header
          menuActive={menuActive}
          setMenuActive={setMenuActive}
          isAuth={isAuth}
        />
        <Routes>
          <Route path="/" element={<Home isAuth={isAuth} />} />
          <Route path="/registration" element={<Registration />} />
          <Route
            path="/authorization"
            element={<Authorization setIsAuth={setIsAuth} />}
          />
          <Route path="/book/:group/:page" element={<Book />} />
          <Route path="/games" element={<Games />} />
          <Route path="/games/:group/:page" element={<Games />} />
          <Route path="/audioGame" element={<AudioGame />} />
          <Route path="/audioGame/:group/:page" element={<AudioGame />} />
          <Route path="/sprint/" element={<Sprint />} />
          <Route path="/sprint/:group/:page" element={<Sprint />} />
          <Route path="/sprint" element={<Sprint />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/bookInfo" element={<BookInfo />} />
          <Route path="/statInfo" element={<StatInfo />} />
          <Route path="/gameInfo" element={<GameInfo />} />
        </Routes>
        <Footer />
      </GlobalContextProvider>
    </BrowserRouter>
  );
}

export default App;
