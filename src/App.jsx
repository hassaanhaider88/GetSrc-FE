import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import {
  TbLayoutSidebarRightCollapse,
  TbLayoutSidebarLeftCollapse,
} from "react-icons/tb";
import HomePage from "./Pages/HomePage";
import DashBoardPage from "./Pages/DashBoardPage";
import Profile from "./Pages/Profile";
import SideBar from "./Components/SideBar";
import UpgradePage from "./Pages/UpgradePage";
import UploadPage from "./Pages/UploadPage";
import LoginForm from "./Pages/LoginForm";
import AboutUs from "./Pages/AboutUs";
import PageNotFound from "./Pages/PageNotFound";
import { ToastContainer } from "react-toastify";
import { useAuth } from "./AuthContext";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import LegalPage from "./Pages/LegalPage";
import SearchImagesGallery from "./Pages/SearchImages";
import SearchVideoGallery from "./Pages/SearchVideos";


const App = () => {
  const [isSidebarShown, setIsSidebarShown] = useState(true);
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("UserData"));
    setIsLoggedIn(!!user);
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white text-black">
        <div className="flex flex-1 w-full">
          {/* Sidebar */}
          <nav
            className={`transition-all duration-300 ${
              isSidebarShown ? "w-[10%] border-r shadow-md" : "w-0"
            } relative bg-white`}
            aria-label="Sidebar Navigation"
          >
            <SideBar IsideBarShown={isSidebarShown} />
            <button
              aria-label={
                isSidebarShown ? "Collapse Sidebar" : "Expand Sidebar"
              }
              onClick={() => setIsSidebarShown(!isSidebarShown)}
              className="absolute w-10 h-10 -right-[40px] flex justify-center items-center hover:scale-95 transition-all duration-300 top-3 z-50"
            >
              {isSidebarShown ? (
                <TbLayoutSidebarLeftCollapse size={24} />
              ) : (
                <TbLayoutSidebarRightCollapse size={24} />
              )}
            </button>
          </nav>

          {/* Main Content */}
          <main
            id="main-content"
            className={`transition-all duration-300 ${
              isSidebarShown ? "w-[90%]" : "w-full"
            } mx-auto`}
            role="main"
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/dashboard"
                element={
                  isLoggedIn ? (
                    <DashBoardPage />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route
                path="/upload-file"
                element={
                  isLoggedIn ? <UploadPage /> : <Navigate to="/login" replace />
                }
              />
              <Route
                path="/upgrade"
                element={
                  isLoggedIn ? (
                    <UpgradePage />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route
                path="/profile"
                element={
                  isLoggedIn ? <Profile /> : <Navigate to="/login" replace />
                }
              />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/terms" element={<LegalPage />} />
              <Route path="/searchImages" element={<SearchImagesGallery />} />
              <Route path="/searchVideos" element={<SearchVideoGallery  />} />
              
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </main>
        </div>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar
          newestOnTop
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          role="status"
        />
      </div>
    </Router>
  );
};

export default App;
