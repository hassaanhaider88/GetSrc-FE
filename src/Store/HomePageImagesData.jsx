/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";
import GetSrcBE from "../../API.js";

const HomePageImagesDataContext = createContext(null);

export const HomePageImagesProvider = ({ children }) => {
  const [homePageImagesData, setHomePageImagesData] = useState([]);
  return (
    <HomePageImagesDataContext.Provider
      value={{ homePageImagesData, setHomePageImagesData }}
    >
      {children}
    </HomePageImagesDataContext.Provider>
  );
};

export default HomePageImagesDataContext;

export async function fetchHomeScreenData(PageNo = 1) {
  try {
    const res = await fetch(`${GetSrcBE}/api/files?page=${PageNo}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
}
