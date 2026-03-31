import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./AuthContext";
import { HomePageImagesProvider } from "./Store/HomePageImagesData";

createRoot(document.getElementById("root")).render(
  
  <AuthProvider>
    <HomePageImagesProvider>
      <App />
    </HomePageImagesProvider>
  </AuthProvider>,
);
