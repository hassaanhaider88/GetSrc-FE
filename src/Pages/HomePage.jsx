import React, { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import SingleFileHome from "../Components/SingleFileHome";
import TabRadio from "../Components/TabRadio";
import NoFound from "../Components/NoFound";
import { useAuth } from "../AuthContext";
import { Helmet } from "react-helmet";
import FirstData from "../DummyData/File.json";

const HomePage = () => {
  const [searchVal, setSearchVal] = useState("");
  const [SelectedTab, setSelectedTab] = useState("All");

  const { DummyFiles, setFilesCopy, FilesCopy, FetchLoading } = useAuth();

  useEffect(() => {
    if (DummyFiles && DummyFiles.length > 0) {
      setFilesCopy(DummyFiles);
    } else {
      setFilesCopy(FirstData);
    }
  }, [DummyFiles]);

  FilesCopy;
  console.log(FilesCopy);
  // Filter files on search input
  useEffect(() => {
    if (!DummyFiles || DummyFiles.length === 0) return;

    if (searchVal.trim() === "") {
      setFilesCopy(DummyFiles);
    } else {
      const filtered = DummyFiles.filter((file) =>
        file.FileName.toLowerCase().includes(searchVal.toLowerCase())
      );
      setFilesCopy(filtered);
    }
  }, [searchVal, DummyFiles, setFilesCopy]);

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
      <section className="w-full min-h-screen px-10 py-10">
        {FetchLoading ? (
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
                onClick={() => {}}
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
                FilesCopy?.length > 0
                  ? "grid md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 gird-col-1"
                  : "flex"
              } ResentFiles py-10 w-full justify-center items-center flex-col gap-5`}
              role="list"
              aria-label="Filtered media files"
            >
              {FilesCopy?.length > 0 ? (
                FilesCopy.map((file, idx) => (
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
