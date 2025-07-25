import React, { use, useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";

import SingleFileHome from "../Components/SingleFileHome";
import TabRadio from "../Components/TabRadio";
import NoFound from "../Components/NoFound";

import { Helmet } from "react-helmet";
import FirstData from "../DummyData/File.json";
import { toast } from "react-toastify";
import { useGlobalState } from "@hmk_codeweb88/useglobalstate";
import { useNavigate } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";

const HomePage = () => {
  const navigate = useNavigate();
  const [openSeachTab, setOpenSeachTab] = useState(false);
  const [selectedSeachTab, setSelectedSeachTab] = useGlobalState(
    "ImagesTab",
    "Images",
    { persist: true }
  );

  const [searchVal, setSearchVal] = useGlobalState("SearchVal", "");
  const [SelectedTab, setSelectedTab] = useState("All");
  const [DummyData, setDummyData] = useState(FirstData);

  useEffect(() => {
    setDummyData(DummyData.sort(() => Math.random() - 0.5));
    console.log(DummyData);
  }, []);

  const handleUserSearch = () => {
    if (searchVal.trim() === "")
      return toast.error("Please Search Something....");
    if (selectedSeachTab == "Images") {
      navigate(`/searchImages?query=${searchVal}`);
    } else {
      navigate(`/searchVideos?query=${searchVal}`);
    }
  };

  return (
    <>
      <Helmet>
        <title>
          GetURI – Upload & Host Images Instantly | Free Image CDN for Devs
        </title>
        <meta
          name="description"
          content="Learn about GetURI - the user can access to all uploaded media and Copy and download other's Media"
        />
      </Helmet>
      <section className="w-full min-h-screen px-5 py-10 sm:px-10">
        {DummyData == [] ? (
          <div role="status" aria-live="polite" className="text-center text-xl">
            Loading...
          </div>
        ) : (
          <div>
            {/* Search Bar */}

            <form
              role="search"
              aria-label="Search files"
              className="SearchComponent w-[70%] gap-3 justify-center items-center bg-[#F6F5FB] py-2 px-3 mx-auto flex rounded-[40px]"
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
                className="block w-full outline-none bg-transparent"
                placeholder="Search files..."
                aria-label="Search files by name"
              />
              <div className="relative inline-block text-left">
                <button
                  type="button"
                  onClick={() => setOpenSeachTab(!openSeachTab)}
                  className="flex items-center gap-2 bg-[#4ED7DD] text-white px-4 py-2 rounded-full  shadow hover:bg-[#4ed6ddd7]"
                >
                  {selectedSeachTab} {/* Show selected option */}
                  <FaChevronDown
                    className={`transition-transform ${
                      openSeachTab ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openSeachTab && (
                  <div className="absolute mt-2 w-30 bg-white  rounded-lg shadow-lg z-10">
                    <ul className="py-1">
                      {["Images", "Videos"].map((option) => (
                        <li
                          key={option}
                          className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                            selectedSeachTab === option
                              ? "bg-gray-100 font-semibold"
                              : ""
                          }`}
                          onClick={() => {
                            setSelectedSeachTab(option);
                            setOpenSeachTab(false);
                          }}
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </form>
            {/* Tabs */}
            <div className="w-full pt-6">
              <TabRadio
                SelectedTab={SelectedTab}
                setSelectedTab={setSelectedTab}
              />
            </div>

            {/* Files List */}
            <div
              className={`${
                DummyData?.length > 0
                  ? "grid md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 gird-col-1"
                  : "flex"
              } ResentFiles py-10 w-full justify-center items-center flex-col gap-5`}
              role="list"
              aria-label="Filtered media files"
            >
              {DummyData?.length > 0 ? (
                DummyData.map((file, idx) => (
                  <SingleFileHome
                    key={file._id || idx}
                    FileData={file}
                    SelectedTab={SelectedTab}
                  />
                ))
              ) : (
                <NoFound searchVal={searchVal} />
              )}
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default HomePage;
