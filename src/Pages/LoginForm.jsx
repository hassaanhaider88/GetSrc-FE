import { useState, useEffect } from "react";
import useUserStore from "../Store/UserStore.js";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Helmet } from "react-helmet";

export default function LoginForm() {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const { signUp, signIn, loading, error } = useUserStore();

  const [showPass, setShowPass] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const toggleForm = () => setIsSignIn((prev) => !prev);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fullName, email, password } = formData;
    if (!email || !password || (!isSignIn && !fullName)) {
      return toast.error("Please fill all fields");
    }

    const response = isSignIn
      ? await signIn(email, password)
      : await signUp(fullName, email, password);

    if (response) {
      setIsLoggedIn(true);
    } else {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("UserData"));
    setIsLoggedIn(!!user);
  }, [setIsLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/profile");
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      <Helmet>
        <title>Login To GetURI | HMK CodeWeb</title>
        <meta
          name="description"
          content="Login to GetURI and get access to upload media and get instance Emmedable URI"
        />
      </Helmet>
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#0BA9D1] to-[#71D42C] px-4">
        <div className="relative w-full max-w-md p-8 bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl">
          <header className="text-white text-center mb-6">
            <h1 className="text-4xl font-bold mb-2">
              {isSignIn ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-sm capitalize">Welcome to our platform</p>
          </header>

          {error && (
            <div
              role="alert"
              aria-live="assertive"
              className="bg-red-100 text-red-800 p-2 rounded mb-4 text-center"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {!isSignIn && (
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full p-3 rounded-full border border-white/30 bg-white/20 text-white placeholder-white/70"
                required
                aria-label="Full Name"
              />
            )}

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-full border border-white/30 bg-white/20 text-white placeholder-white/70"
              required
              aria-label="Email Address"
            />

            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 rounded-full border border-white/30 bg-white/20 text-white placeholder-white/70"
                required
                aria-label="Password"
              />
              <button
                type="button"
                onClick={() => setShowPass((prev) => !prev)}
                className="absolute top-[18px] right-3 text-white"
                aria-label={showPass ? "Hide password" : "Show password"}
              >
                {showPass ? <FiEye /> : <FiEyeOff />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                boxShadow: "2px 2px 6px #71D42C, -2px -2px 6px #71D42C",
              }}
              className="w-full p-3 rounded-full font-semibold bg-gradient-to-r from-[#e9e9e9] to-[#e0dddd] hover:scale-95 duration-300 transition-all text-purple-700 hover:bg-purple-100"
              aria-busy={loading}
            >
              {loading ? "Loading..." : isSignIn ? "Sign In" : "Sign Up"}
            </button>
          </form>
          <p className="text-sm">
            By continuing, you must agree to the
            <Link
              to={"/terms"}
              class="text-blue-600 underline px-2 hover:text-blue-800 transition"
            >
              Terms and Conditions
            </Link>
            of our website.
          </p>

          <footer className="text-white text-sm mt-6 text-center">
            {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={toggleForm}
              className="underline font-medium hover:text-white"
            >
              {isSignIn ? "Sign Up" : "Sign In"}
            </button>
          </footer>
        </div>
      </main>
    </>
  );
}
