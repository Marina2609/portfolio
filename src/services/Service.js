import BaseUrl from "../data/words.json";

class Service {
  static async aggregatedWords(word, token) {
    const { userId, group, page, wordsPerPage, filter } = word;

    try {
      const response = await fetch(
        `http://localhost:5000/api/users/${userId}/aggregatedWords?group=${group}&page=${page}&wordsPerPage=${wordsPerPage}&filter=${filter}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      // Проверка статуса
      if (!response.ok) {
        // Можно вернуть статус и текст ошибки
        const errorText = await response.text();
        return { status: response.status, message: errorText };
      }

      // Если ответ успешен, парсим как JSON
      const content = await response.json();
      // console.log(content);
      // Предполагается, что content — массив с объектами
      if (content.length > 0 && content[0].paginatedResults) {
        return content[0].paginatedResults;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
    return undefined;
  }

  static async aggregatedWordsById(word, token) {
    const { userId, wordId } = word;

    try {
      const rawResponse = await fetch(
        `http://localhost:5000/api/users/${userId}/aggregatedWords/${wordId.$oid}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      // Проверка статуса
      if (!rawResponse.ok) {
        // Можно вернуть статус и текст ошибки
        const errorText = await rawResponse.text();
        return { status: rawResponse.status, message: errorText };
      }

      // Если ответ успешен, парсим как JSON
      const content = await rawResponse.json();
      // console.log(content);
      return content;
    } catch (error) {
      console.log(error);
    }
    return undefined;
  }

  static async getWords(group, page) {
    try {
      const response = await fetch(BaseUrl);
      const words = await response.json;
      //   console.log(words);
      return words;

      // `${BaseUrl}/words?group=${group}&page=${page}`
      //   );
      //   const words = await response.json();

      //   return words;
    } catch (error) {
      console.log(error);
    }
    return undefined;
  }

  static async createUser(name, email, password) {
    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify(name, email, password),
      });
      console.log("Response status:", response.status);
      const data = await response.json();
      console.log("Response data:", data);
      if (!response.ok) {
        console.error("Ошибка регистрации:", data);
        return null;
      }
      return data;
    } catch (error) {
      console.error("Ошибка createUser:", error);
      return null;
    }
  }

  static async loginUser(email, password) {
    try {
      const rawResponse = await fetch(`http://localhost:5000/api/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(email, password),
      });

      const loginResponse = await rawResponse.json();

      console.log(loginResponse);
      return loginResponse;
    } catch (error) {
      console.log(error);
    }
    return undefined;
  }

  static async getUserStat(userId, token) {
    try {
      const rawResponse = await fetch(
        `http://localhost:5000/api/users/${userId}/statistics`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      // Проверка статуса
      if (!rawResponse.ok) {
        // Можно вернуть статус и текст ошибки
        const errorText = await rawResponse.text();
        return { status: rawResponse.status, message: errorText };
      }

      const content = await rawResponse.json();
      return content;
    } catch (error) {
      console.log(error);
    }
    return undefined;
  }

  static async updateUserStat(statData, userId, token) {
    try {
      const rawResponse = await fetch(
        `http://localhost:5000/api/users/${userId}/statistics`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(statData),
        }
      );
      if (rawResponse.status === 401) {
        return rawResponse.status;
      }
      const content = await rawResponse.json();
      return content;
    } catch (error) {
      console.log(error);
    }
    return undefined;
  }

  static async createUserWord(wordData, token, word) {
    const { userId, wordId } = wordData;

    try {
      const rawResponse = await fetch(
        `http://localhost:5000/api/users/${userId}/words/${wordId.$oid}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(word),
        }
      );

      // Проверка статуса
      if (!rawResponse.ok) {
        // Можно вернуть статус и текст ошибки
        const errorText = await rawResponse.text();
        return { status: rawResponse.status, message: errorText };
      }

      // Если ответ успешен, парсим как JSON
      const content = await rawResponse.json();
      // localStorage.setItem("hardWord", content);
      return content;
    } catch (error) {
      console.log(error);
    }
    return undefined;
  }

  static async getUserWords(word, token) {
    const { userId } = word;
    try {
      const rawResponse = await fetch(
        `http://localhost:5000/api/users/${userId}/words`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      if (rawResponse.status === 401) {
        return rawResponse.status;
      }
      const content = await rawResponse.json();
      return content;
    } catch (error) {
      console.log(error);
    }
    return undefined;
  }

  static async updateUserWord(wordData, token, word) {
    const { userId, wordId } = wordData;
    try {
      const rawResponse = await fetch(
        `http://localhost:5000/api/users/${userId}/words/${wordId.$oid}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(word),
        }
      );
      if (rawResponse.status === 401) {
        return rawResponse.status;
      }

      const content = await rawResponse.json();
      return content;
    } catch (error) {
      console.log(error);
    }
    return undefined;
  }

  static async deleteUserWord(word, token) {
    const { userId, wordId } = word;
    try {
      const rawResponse = await fetch(
        `http://localhost:5000/api/users/${userId}/words/${wordId.$oid}`,

        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      return rawResponse.status;
    } catch (error) {
      console.log(error);
    }
    return undefined;
  }
}

export default Service;
