import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ReactPaginate from "react-paginate";
import MediaQuery from "react-responsive";
import { useNavigate, useParams } from "react-router-dom";
import Service from "../../services/Service";
import PreLoaderProgress from "../../components/preloader/PreLoaderProgress";
import BookItem from "../../components/bookItem/BookItem";
import BaseUrl from "../../data/words.json";

import "./Book.css";

const Book = () => {
  const { group, page } = useParams();
  const navigator = useNavigate();
  const [forcePage, setForcePage] = useState(0);
  const [words, setWords] = useState([]);
  const [groupInfo, setGroupInfo] = useState("Слова уровня A1");
  const [loader, setLoader] = useState(false);
  const [offsetY, setOffsetY] = useState(0);
  const [visible, setVisible] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [levelInfo, setLevelInfo] = useState("Beginner");
  const [textColor, setTextColor] = useState("");
  const [colorLearnedPage, setColorLearnedPage] = useState("");
  const [activePaginationClass, setActivePaginationClass] = useState("");
  let [learn] = useState("");
  const [value, setValue] = useState(2);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageInBook, setPageInBook] = useState(1);

  // const itemsPerPage = value;
  // // Вычисляем текущие элементы
  // const startIdx = currentPage * itemsPerPage;
  // const endIdx = startIdx + itemsPerPage;
  // const currentItems = words.slice(startIdx, endIdx);
  // console.log(currentItems);

  // const options = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20];
  // const [isOpen, setIsOpen] = useState(false);

  // const toggleOpen = () => setIsOpen(!isOpen);

  // const handleSelect = (num) => {
  //   setValue(num);
  //   setIsOpen(false);
  //   setPageInBook(1);
  //   fetchPartialWords();
  // };

  // // Обработчики кнопок
  // const handlePrev = () => {
  //   if (currentPage > 0) {
  //     setCurrentPage(currentPage - 1);
  //     setPageInBook(pageInBook - 2);
  //   }
  // };

  // const handleNext = () => {
  //   if (endIdx < words.length) {
  //     setCurrentPage(currentPage + 1);
  //     setPageInBook(pageInBook + 2);
  //   }
  // };

  useMemo(() => {
    switch (group) {
      case "1":
        setTextColor("red");
        break;
      case "2":
        setTextColor("orange");
        break;
      case "3":
        setTextColor("darkcyan");
        break;
      case "4":
        setTextColor("lightskyblue");
        break;
      case "5":
        setTextColor("lightpink");
        break;
      case "6":
        setTextColor("purple");
        break;
      case "7":
        setTextColor("violet");
        break;
      default:
        break;
    }
  }, [group]);

  const setLocalStorage = () => {
    localStorage.setItem("pageLearn", learn);
  };

  const fetchHardWords = useCallback(
    async (userId, token) => {
      if (group === "7") {
        setLoader(true);

        const hardWords = await Service.aggregatedWords(
          {
            userId,
            group: "",
            page: "",
            wordsPerPage: "20",
            filter: `{"$and":[{"userWord.difficulty":"hard", "userWord.optional.testFieldBoolean":${true}}]}`,
          },
          token
        );

        console.log(hardWords);

        if (typeof hardWords === "number") {
          setIsAuth(false);
          localStorage.clear();
          navigator("/authorization");
          return;
        }

        setWords(hardWords);
        setLoader(false);
      }
    },
    [group, navigator]
  );

  useEffect(() => {
    if (isAuth) {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      fetchHardWords(userId, token);
    }
  }, [isAuth, fetchHardWords]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (token !== null && userId !== null) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }

    setForcePage(+page - 1);
  }, [page]);

  const fetchPartialWords = useCallback(async () => {
    setLoader(true);

    const wordsArr = BaseUrl.filter(
      (item) => item.group === group - 1 && item.page === page - 1
    );

    setWords(wordsArr);
    setCurrentPage(0);
    setLoader(false);
  }, [group, page]);

  useEffect(() => {
    fetchPartialWords();
  }, [fetchPartialWords]);

  useEffect(() => {
    switch (group) {
      case "1":
        setGroupInfo("Cлова уровня A1");
        setLevelInfo("Beginner");
        break;
      case "2":
        setGroupInfo("Cлова уровня A2");
        setLevelInfo("Elementary");
        break;
      case "3":
        setGroupInfo("Cлова уровня B1");
        setLevelInfo("Intermediate");
        break;
      case "4":
        setGroupInfo("Слова уровня B2");
        setLevelInfo("Upper Intermediate");
        break;
      case "5":
        setGroupInfo("Слова уровня C1");
        setLevelInfo("Advanced");
        break;
      case "6":
        setGroupInfo("Слова уровня C2");
        setLevelInfo("Proficiency");
        break;
      case "7":
        setGroupInfo("Сложные слова");
        setLevelInfo("");
        break;
      default:
        break;
    }
  }, [group]);

  const showUpButton = useCallback(() => {
    if (offsetY > 1500) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [offsetY]);

  useEffect(() => {
    showUpButton();
  }, [showUpButton]);

  const pageLerned = () => {
    navigator(`/book/${group}/${page}/pageExplored`);
  };

  const handlerGroup = (event) => {
    const { dataset } = event.target;

    if (!dataset.group) return;

    const currentGroup = dataset.group;

    switch (currentGroup) {
      case "1":
        setGroupInfo("Cлова уровня A1");
        setLevelInfo("Beginner");
        break;
      case "2":
        setGroupInfo("Cлова уровня A2");
        setLevelInfo("Elementary");
        break;
      case "3":
        setGroupInfo("Cлова уровня B1");
        setLevelInfo("Intermediate");
        break;
      case "4":
        setGroupInfo("Слова уровня B2");
        setLevelInfo("Upper Intermediate");
        break;
      case "5":
        setGroupInfo("Слова уровня C1");
        setLevelInfo("Advanced");
        break;
      case "6":
        setGroupInfo("Слова уровня C2");
        setLevelInfo("Proficiency");
        break;
      case "7":
        setGroupInfo("Сложные слова");
        break;
      default:
        break;
    }

    navigator(`/book/${currentGroup}/1`);
    setPageInBook(1);
  };

  const handlerPageClick = (selectedItem) => {
    setForcePage(selectedItem.selected);
    navigator(`/book/${group}/${selectedItem.selected + 1}`);
    setPageInBook(1);
  };

  function scrollCalc() {
    const offsetTop = window.scrollY;

    setOffsetY(offsetTop);
  }

  window.addEventListener("scroll", scrollCalc);

  const setColorPage = useCallback(
    (color) => {
      if (color !== "") {
        setColorLearnedPage(color);
        setActivePaginationClass("active learned");
        learn = "true";
        setLocalStorage();
      } else {
        setColorLearnedPage("");
        setActivePaginationClass("active");
        learn = "false";
        setLocalStorage();
      }
    },
    [setColorLearnedPage]
  );

  return (
    <main className="page-book">
      <a
        style={{ display: visible ? "block" : "none" }}
        href="#top"
        className="btn-floating"
      >
        <i className="material-icons">arrow_upward</i>
      </a>
      <div className="group" aria-hidden onClick={handlerGroup}>
        <div className="group-item" data-group="1">
          Уровень A1 - Beginner
        </div>
        <div className="group-item" data-group="2">
          Уровень A2 - Elementary
        </div>
        <div className="group-item" data-group="3">
          Уровень B1 - Intermediate
        </div>
        <div className="group-item" data-group="4">
          Уровень B2 - Upper Intermediate
        </div>
        <div className="group-item" data-group="5">
          Уровень C1 - Advanced
        </div>
        <div className="group-item" data-group="6">
          Уровень C2 - Proficiency
        </div>
        <div
          style={{ visibility: isAuth ? "visible" : "hidden" }}
          className="group-item"
          data-group="7"
        >
          &quot;Сложные слова&quot;
        </div>
      </div>
      <div
        style={{ display: group === "7" || loader ? "none" : "flex" }}
        className="paginate"
      >
        <div
          style={{
            // maxWidth: "200px",
            margin: "5px 0",
            fontFamily: "Arial, sans-serif",
            textAlign: "center",
            display: "flex",
            zIndex: "2",
          }}
        >
          {/* Отображение результата */}
          {/* <div
            style={{
              // marginTop: "20px",
              padding: "15px 10px",
              borderRadius: "8px",
              backgroundColor: "#f9f9f9",
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
            }}
          >
            Количество слов:
          </div>
          <div
            style={{
              position: "relative",
              cursor: "pointer",
              borderRadius: "8px",
              border: "2px solid #ccc",
              padding: "13px 30px",
              backgroundColor: "#fff",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            }}
            onClick={toggleOpen}
          >
            {value}
            <div
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: "12px",
              }}
            >
              ▼
            </div>
          </div>

          {isOpen && (
            <div
              style={{
                margin: "1px 0 0 143px",
                borderRadius: "8px",
                border: "2px solid #ccc",
                backgroundColor: "#fff",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                position: "absolute",
                width: "70px",
              }}
            >
              {options.map((num) => (
                <div
                  key={num}
                  onClick={() => handleSelect(num)}
                  style={{
                    padding: "10px",
                    cursor: "pointer",
                    backgroundColor: num === value ? "#f0f0f0" : "#fff",
                  }}
                >
                  {num}
                </div>
              ))}
            </div>
          )} */}
        </div>
        <ReactPaginate
          onPageChange={handlerPageClick}
          nextLabel=">"
          pageRangeDisplayed={5}
          marginPagesDisplayed={3}
          forcePage={forcePage}
          pageCount={30}
          previousLabel="<"
          pageClassName="waves-effect"
          pageLinkClassName="page-link"
          previousClassName="waves-effect"
          previousLinkClassName="page-link"
          nextClassName="waves-effect"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="waves-effect"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName={activePaginationClass}
        />
      </div>
      <PreLoaderProgress show={loader} />

      <div
        className="book__container"
        style={{ display: !loader ? "block" : "none" }}
      >
        {/* <button
          className="pages__button btn-left"
          onClick={handlePrev}
          disabled={pageInBook === 1}
        >
          {pageInBook}
        </button>
        <button
          className="pages__button btn-right"
          onClick={handleNext}
          disabled={endIdx >= words.length}
        >
          {pageInBook + 1}
        </button> */}
        <div className="wrapper-flag" onClick={handlerGroup} aria-hidden>
          <div className="flag" data-group="1">
            <span className="flag-text">Уровень A1</span>
          </div>
          <div className="flag" data-group="2">
            {" "}
            <span className="flag-text">Уровень A2</span>
          </div>
          <div className="flag" data-group="3">
            {" "}
            <span className="flag-text">Уровень B1</span>
          </div>
          <div className="flag" data-group="4">
            {" "}
            <span className="flag-text">Уровень B2</span>{" "}
          </div>
          <div className="flag" data-group="5">
            {" "}
            <span className="flag-text">Уровень C1</span>{" "}
          </div>
          <div className="flag" data-group="6">
            {" "}
            <span className="flag-text">Уровень C2</span>
          </div>

          <div
            style={{ visibility: isAuth ? "visible" : "hidden" }}
            className="flag"
            data-group="7"
          >
            {" "}
            <span className="flag-text">Сложные</span>
          </div>
        </div>
        <section className="open-book">
          <h2 style={{ color: textColor }} className="chapter-title">
            {words.length ? groupInfo : "Здесь пока ничего нет..."}
          </h2>
          <MediaQuery minWidth={800}>
            <h2
              style={{
                display: group !== "7" ? "inline-block" : "none",
                color: colorLearnedPage,
              }}
              className="chapter-title "
            >
              {words.length ? levelInfo : ""}
            </h2>
          </MediaQuery>

          <article>
            {/* {currentItems.map((word) => ( */}
            {words.map((word) => (
              <BookItem
                key={word.id || word._id}
                id={word.id || word._id}
                word={word.word}
                image={word.image}
                audio={word.audio}
                audioMeaning={word.audioMeaning}
                audioExample={word.audioExample}
                textMeaning={word.textMeaning}
                textExample={word.textExample}
                transcription={word.transcription}
                wordTranslate={word.wordTranslate}
                textMeaningTranslate={word.textMeaningTranslate}
                textExampleTranslate={word.textExampleTranslate}
                group={group}
                page={page}
                callback={setColorPage}
              />
            ))}
          </article>
        </section>
      </div>
      {/* {!loader && <Footer />} */}
    </main>
  );
};

export default Book;
