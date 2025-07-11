import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useUserStore from "../Store/UserStore";
import { useAuth } from "../AuthContext";
import GetSrcBE from '../../API.js'
import { Helmet } from "react-helmet";


const Profile = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const { signOut } = useUserStore();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [plan, setPlan] = useState("");
  const [numberOfUpload, setNumberOfUpload] = useState(0);
  const [profileImage, setProfileImage] = useState("");
  const profileImgRef = useRef(null);

  const handleUploadClick = () => {
    profileImgRef.current.click();
  };

  const handleFileUpload = (file) => {
    if (
      file.type === "image/svg+xml" ||
      file.type.startsWith("application/") ||
      file.type.startsWith("text/")
    )
      return toast.error("Not Supported File");

    const previewUri = URL.createObjectURL(file);
    setProfileImage(previewUri);
    const user = JSON.parse(localStorage.getItem("UserData"));
    if (user) {
      user.profile = previewUri;
      localStorage.setItem("UserData", JSON.stringify(user));
    }
  };

  const handleSignOut = () => {
    if (confirm("Are you sure you want to Sign Out?")) {
      signOut();
      navigate("/");
    }
  };

  const handleDeactivate = () => {
    if (confirm("Are you sure you want to delete your account?")) {
      signOut();
      navigate("/");
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("UserData"));
    if (!user) return;

    async function fetchData() {
      const res = await fetch(`${GetSrcBE}/api/user/${user._id}`);
      const result = await res.json();
      if (result?.succuss) {
        const data = result.data;
        setFullName(data.full_name);
        setEmail(data.email);
        setPlan(data.ProPlan);
        setProfileImage(data.profile);
        setNumberOfUpload(data.uploadedMedia?.length || 0);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        navigate("/");
      }
    }

    fetchData();
  }, [navigate, setIsLoggedIn]);

  return (
    <>
    <Helmet>
        <title>User Profile | GetURI</title>
        <meta
          name="description"
          content="The user can access to his profile sign out and also upgrade his account."
        />
      </Helmet>
        <main className="min-h-screen bg-gray-100 py-10 px-4">
      <section className="max-w-2xl mx-auto bg-white rounded-2xl shadow-md">
        {/* Header */}
        <header className="border-b border-gray-200 px-6 py-5 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900">{fullName}</h1>
          <span className="text-[10px] text-center flex flex-col items-center bg-blue-100 text-blue-600 font-medium px-3 py-1 rounded-full">
            {plan && (
              <img
                src="https://cdn-icons-png.flaticon.com/128/6423/6423882.png"
                className="w-5 h-5"
                alt="Pro Badge"
              />
            )}
            {plan ? "Pro" : "Free"} Plan
          </span>
        </header>

        <section className="px-6 py-8 space-y-8">
          {/* Profile Image */}
          <div className="flex items-center space-x-5">
            <div className="w-16 h-16 ring-[0.5px] p-[2px] bg-[#43D6DD] rounded-full overflow-hidden">
              <img
                src={profileImage}
                alt="User Profile"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900">Profile Photo</h3>
              <p className="text-xs text-gray-500 mb-2">
                We support JPEG, PNG, and GIF files under 10MB.
              </p>
              <input
                hidden
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/gif"
                ref={profileImgRef}
                onChange={(e) => handleFileUpload(e.target.files[0])}
              />
              <button
                onClick={handleUploadClick}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Upload new picture
              </button>
            </div>
          </div>

          {/* Account Info */}
          <div className="space-y-5">
            <input
              type="text"
              readOnly
              aria-label="Full Name"
              value={fullName}
              className="w-full px-4 py-3 font-semibold border border-gray-300 rounded-md shadow-sm bg-white"
              style={{ boxShadow: "2px 3px 5px inset" }}
            />
            <input
              type="email"
              readOnly
              aria-label="Email"
              value={email}
              className="w-full px-4 py-3 font-semibold border border-gray-300 rounded-md shadow-sm bg-white"
              style={{ boxShadow: "2px 3px 5px inset" }}
            />
            <div
              className="w-full px-4 py-3 font-semibold text-gray-700 bg-gray-50 border border-gray-300 rounded-md"
              aria-label="Remaining Uploads"
              style={{ boxShadow: "2px 3px 5px inset" }}
            >
              {plan ? 50 - numberOfUpload : 15 - numberOfUpload} Remaining Uploads
            </div>
          </div>

          {/* Buttons */}
          <div className="w-full flex justify-between gap-3">
            <Link
              to="/upgrade"
              className="w-full md:w-auto text-center px-5 py-2 border-2 border-[#43d6dd] text-black hover:bg-[#4ed6ddc4] hover:text-white rounded-full transition-all duration-300"
            >
              Upgrade Account
            </Link>
            <button
              onClick={handleSignOut}
              className="w-full md:w-auto px-5 py-2 bg-[#43d6dd] text-white hover:bg-transparent hover:text-black border-2 border-transparent hover:border-[#43d6dd] rounded-full transition-all duration-300"
            >
              Sign Out
            </button>
          </div>

          {/* Deactivation */}
          <div className="pt-6 border-t border-gray-200 space-y-3">
            <h3 className="text-sm font-medium text-gray-900">Deactivate Account</h3>
            <p className="text-sm text-gray-500">
              This will permanently delete your profile and remove you from all workspaces.
            </p>
            <button
              onClick={handleDeactivate}
              className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600 focus:ring-2 focus:ring-red-400 focus:outline-none"
            >
              Deactivate Account
            </button>
          </div>
        </section>
      </section>
    </main>
    </>
  );
};

export default Profile;
