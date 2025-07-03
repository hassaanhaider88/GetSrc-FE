import { createContext, useContext, useEffect, useState } from "react";
import GetSrcBE from "../API.js";

// Create context
const AuthContext = createContext();

// Export custom hook for easy access
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(localStorage.getItem("UserData")) || false
  );
  const [DummyFiles, setDummyFiles] = useState([]);
  const [FilesCopy, setFilesCopy] = useState([]);
  const [FetchLoading, setFetchLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      setFetchLoading(true);
      var req = await fetch(`${GetSrcBE}/api/files`);
      var data = await req.json();
      if (!data.Data) {
        setFetchLoading(false)
        return setDummyFiles([]);
      }
      setDummyFiles(data.Data);
      setFilesCopy(data.Data.sort(() => Math.random() - 0.5));
    }
    fetchData();
    setFetchLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        FetchLoading,
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
