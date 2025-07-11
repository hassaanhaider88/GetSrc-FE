import { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import TabRadio from "../Components/TabRadio";
import NoFound from "../Components/NoFound";
import SingleFileInfo from "../Components/SingleFileDashBoard";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { toast } from "react-toastify";
import GetSrcBE from '../../API.js'
import { Helmet } from "react-helmet";



const DashBoardPage = () => {
  const [searchVal, setSearchVal] = useState("");
  const [files, setFiles] = useState([]);
  const [filteredFiles, setFilteredFiles] = useState([]);
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [SelectedTab, setSelectedTab] = useState("All");

  // Filter files by search query
  useEffect(() => {
    if (searchVal.trim() === "") {
      setFilteredFiles(files);
    } else {
      const result = files.filter((file) =>
        file.FileName.toLowerCase().includes(searchVal.toLowerCase())
      );
      setFilteredFiles(result);
    }
  }, [searchVal, files]);

  // Fetch user files
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("UserData"));
    if (!user) return;

    const fetchFiles = async () => {
      try {
        const res = await fetch(`${GetSrcBE}/api/user/${user._id}`);
        const data = await res.json();
        const uploaded = data?.data?.uploadedMedia || [];
        setFiles(uploaded);
        setFilteredFiles(uploaded);
      } catch (error) {
        toast.error("Error fetching user data");
      }
    };

    fetchFiles();
  }, []);

  // Sync auth state from localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("UserData"));
    setIsLoggedIn(!!user);
  }, []);

  // Redirect to dashboard if logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
     <Helmet>
        <title>DashBoard | GetURI</title>
        <meta
          name="description"
          content="Learn about GetURI - the user can access to his all uploaded media and manage them easily."
        />
      </Helmet>
    <section className="w-full min-h-screen px-4 sm:px-[50px] md:px-[100px] sm:py-5 py-2 md:py-10">
      {/* Search bar */}
      <form
        role="search"
        aria-label="Search Files"
        className="SearchComponent w-[70%] gap-3 justify-center items-center bg-[#F6F5FB] py-2 px-3 mx-auto flex rounded-[40px]"
        onSubmit={(e) => e.preventDefault()}
      >
        <IoMdSearch
          onClick={() => setSearchVal(searchVal)} // for manual click if needed
          className="cursor-pointer hover:scale-90 transition-all duration-300"
          size={20}
          aria-label="Search"
        />
        <input
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          type="search"
          className="block w-full outline-none bg-transparent"
          placeholder="Search files..."
          aria-label="Search files by name"
        />
        {searchVal && (
          <RxCross2
            onClick={() => setSearchVal("")}
            size={20}
            className="cursor-pointer font-bold hover:scale-90 transition-all duration-300"
            aria-label="Clear search"
          />
        )}
      </form>

      {/* Tabs */}
      <div className="w-full pt-6">
        <TabRadio SelectedTab={SelectedTab} setSelectedTab={setSelectedTab} />
      </div>

      {/* Files display */}
      <div
        className={`${
          filteredFiles.length > 0
            ? "md:grid-cols-2 grid-cols-1 h-screen"
            : "grid-cols-1"
        } grid mt-10 px-20 overflow-x-hidden overflow-y-auto ResentFiles py-10 w-full shadow-xl rounded-4xl justify-center items-center flex-col gap-5`}
        role="list"
        aria-label="Uploaded files"
      >
        {filteredFiles.length > 0 ? (
          filteredFiles.map((file, idx) => (
            <SingleFileInfo
              key={file._id || idx}
              Length={idx + 1}
              SelectedTab={SelectedTab}
              FileData={file}
            />
          ))
        ) : (
          <NoFound searchVal={searchVal} IsDashPage={true} />
        )}
      </div>
    </section>
    </>
  );
};

export default DashBoardPage;
