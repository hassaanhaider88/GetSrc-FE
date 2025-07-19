import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import QueryImages from "../Components/QueryImages";
import { Helmet } from "react-helmet";
import { useGlobalState } from "@hmk_codeweb88/useglobalstate";
import LoadingCom from '../Components/Loading'
import { IoMdSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_KEY;

function useQuery() {
  const { search } = useLocation();
  return new URLSearchParams(search);
}
function SearchImagesGallery() {
  var navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [searchVal, setSearchVal] = useGlobalState("SearchVal");
  const [loading, setLoading] = useState(false);

  const query = useQuery().get("query") || "nature";
  const fetchImages = async () => {
    setLoading(true);
    setSearchVal(query);
    try {
      const response = await axios.get(
        "https://api.unsplash.com/search/photos",
        {
          params: {
            query: query, // 🔍 Change this to anything (e.g., animals, tech)
            per_page: 20,
          },
          headers: {
            Authorization: `Client-ID ${ACCESS_KEY}`,
          },
        }
      );
      setImages(response.data.results);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Error fetching images:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [query]);

  const handleUserSearch = () => {
    if (searchVal.trim() === "")
      return toast.error("Please Search Something....");
    navigate(`/searchImages?query=${searchVal}`);
  };

  return (
    <>
      <Helmet>
        <title>
          GetURI – Search Images Instantly | Free Image CDN for Devs
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
          {images.map((img) => (
            <QueryImages ImageData={img} />
          ))}
        </div>
      )}
    </>
  );
}

export default SearchImagesGallery;
