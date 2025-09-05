import React, { createContext, useContext, useMemo, useState } from "react";

const GlobalContext = createContext({
  userId: "",
  setUserId: () => {},
});

export const GlobalContextProvider = ({ children }) => {
  const [userId, setUserId] = useState("");
  const context = useMemo(() => ({ userId, setUserId }), [userId]);
  return (
    <GlobalContext.Provider value={context}>{children}</GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
