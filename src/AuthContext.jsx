/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import GetSrcBE from "../API.js";
import FirstData from "./DummyData/File.json";

// Create context
const AuthContext = createContext();

// Export custom hook for easy access
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
   (localStorage.getItem("getURIUser")) || false,
  );
  const [DummyFiles, setDummyFiles] = useState([]);
  const [FilesCopy, setFilesCopy] = useState([]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        DummyFiles,
        setDummyFiles,
        setFilesCopy,
        FilesCopy,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
