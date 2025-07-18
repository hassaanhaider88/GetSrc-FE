import axios from "axios";
import { Helmet } from "react-helmet";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import QueryVideos from "../Components/QueryVideos";
import LoadingCom from '../Components/Loading'

import { useGlobalState } from "@hmk_codeweb88/useglobalstate";

import { IoMdSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

const API_KEY = import.meta.env.VITE_PEXEL_API_KEY;
function useQuery() {
  const { search } = useLocation();
  return new URLSearchParams(search);
}

function SearchVideoGallery() {
  var navigate = useNavigate();

  const [videos, setVideos] = useState([]);
  const [searchVal, setSearchVal] = useGlobalState("SearchVal");
  const [loading, setLaoding] = useState(false);
  const query = useQuery().get("query") || "Coding";

  useEffect(() => {
    const fetchVideos = async () => {
      setLaoding(true);
      setSearchVal(query);
      const res = await axios.get("https://api.pexels.com/videos/search", {
        headers: { Authorization: API_KEY },
        params: { query, per_page: 20 },
      });
      setVideos(res.data.videos);
      setTimeout(() => {
        setLaoding(false);
      }, 2000);
    };
    fetchVideos();
  }, [query]);

  const handleUserSearch = () => {
    if (searchVal.trim() === "")
      return toast.error("Please Search Something....");
    navigate(`/searchVideos?query=${searchVal}`);
  };

  return (
    <>
      <Helmet>
        <title>
          GetURI – Search Videos Instantly | Free Image CDN for Devs
        </title>
        <meta
          name="description"
          content="Learn about GetURI - the user can search to all uploaded media and Copy and download other's Media"
        />
      </Helmet>
      <form
        role="search"
        aria-label="Search files"
        className="SearchComponent mt-10 w-[70%] gap-3 justify-center items-center bg-[#F6F5FB] py-2 px-3 mx-auto flex rounded-[40px]"
        onSubmit={(e) => e.preventDefault()}
      >
        <IoMdSearch
          onClick={handleUserSearch}
          className="block cursor-pointer hover:scale-90 duration-300 transition-all"
          size={20}
          aria-label="Search files"
        />
        <input
          type="search"
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          className="block  w-full outline-none bg-transparent"
          placeholder="Search files..."
          aria-label="Search files by name"
        />
        {searchVal && (
          <RxCross2
            onClick={() => setSearchVal("")}
            size={20}
            className="cursor-pointer font-bold hover:scale-90 duration-300 transition-all"
            aria-label="Clear search input"
          />
        )}
      </form>
      {loading ? (
       <LoadingCom/>
      ) : (
        <div className="grid md:grid-cols-3 mt-10 px-5 lg:grid-cols-4 gap-4 py-10 sm:grid-cols-2 gird-col-1">
          {videos.map((v, idx) => (
            <QueryVideos key={idx} VideoData={v} />
          ))}
        </div>
      )}
    </>
  );
}

export default SearchVideoGallery;
